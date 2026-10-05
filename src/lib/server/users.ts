import { ObjectId, type WithId } from "mongodb";
import * as fileUsers from "./file-users";
import { getDb } from "./mongo";
import { hashPassword, verifyPassword } from "./password";

type PublicUser = { _id: string; name: string; email: string };

type MongoUserDoc = {
  name: string;
  email: string;
  passwordHash: string;
  createdAt?: Date;
};

function emailExistsError() {
  const err = new Error("EMAIL_EXISTS") as Error & { code?: string };
  err.code = "EMAIL_EXISTS";
  return err;
}

function isWritableFsError(err: unknown) {
  const code = (err as NodeJS.ErrnoException).code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

async function usersCollection() {
  const db = await getDb();
  if (!db) return null;
  return db.collection<MongoUserDoc>("users");
}

function asSessionUser(user: WithId<MongoUserDoc>) {
  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
  };
}

/** Returns null when durable DB/file storage is unavailable (use cookie fallback). */
export async function findUserByEmail(email: string) {
  const col = await usersCollection();
  if (col) {
    const user = await col.findOne({ email });
    return user ? asSessionUser(user) : null;
  }
  try {
    return await fileUsers.findUserByEmail(email);
  } catch {
    return null;
  }
}

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const col = await usersCollection();
  if (col) {
    const existing = await col.findOne({ email });
    if (existing) throw emailExistsError();
    try {
      const doc: MongoUserDoc = {
        name,
        email,
        passwordHash: await hashPassword(password),
        createdAt: new Date(),
      };
      const result = await col.insertOne(doc);
      return {
        _id: String(result.insertedId),
        name,
        email,
        passwordHash: doc.passwordHash,
      };
    } catch (err) {
      if ((err as { code?: number }).code === 11000) throw emailExistsError();
      throw err;
    }
  }

  // Vercel (and similar) have a read-only app filesystem.
  if (process.env.VERCEL) {
    throw new Error("DATABASE_UNAVAILABLE");
  }

  try {
    return await fileUsers.createUser({ name, email, password });
  } catch (err) {
    if ((err as { code?: string }).code === "EMAIL_EXISTS") throw err;
    if (isWritableFsError(err)) {
      throw new Error("DATABASE_UNAVAILABLE");
    }
    throw err;
  }
}

export async function verifyLogin(email: string, password: string) {
  const col = await usersCollection();
  if (col) {
    const user = await col.findOne({ email });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return null;
    }
    return asSessionUser(user);
  }
  try {
    return await fileUsers.verifyLogin(email, password);
  } catch {
    return null;
  }
}

export async function findUserById(id: string): Promise<PublicUser | null> {
  const col = await usersCollection();
  if (col) {
    if (!ObjectId.isValid(id)) return null;
    const user = await col.findOne(
      { _id: new ObjectId(id) },
      { projection: { name: 1, email: 1 } },
    );
    if (!user) return null;
    return { _id: String(user._id), name: user.name, email: user.email };
  }
  try {
    return await fileUsers.findUserById(id);
  } catch {
    return null;
  }
}
