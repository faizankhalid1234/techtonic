import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { hashPassword, verifyPassword } from "./password";

const USERS_FILE = path.join(process.cwd(), "data", "users.json");

type StoredUser = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

async function readAll(): Promise<StoredUser[]> {
  try {
    const raw = await readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(users: StoredUser[]) {
  await mkdir(path.dirname(USERS_FILE), { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string) {
  const users = await readAll();
  return users.find((u) => u.email === email) ?? null;
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
  const users = await readAll();
  if (users.some((u) => u.email === email)) {
    const err = new Error("EMAIL_EXISTS") as Error & { code?: string };
    err.code = "EMAIL_EXISTS";
    throw err;
  }
  const user: StoredUser = {
    _id: randomUUID(),
    name,
    email,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeAll(users);
  return user;
}

export async function verifyLogin(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return null;
  }
  return user;
}

export async function findUserById(id: string) {
  const users = await readAll();
  const user = users.find((u) => u._id === id);
  if (!user) return null;
  return { _id: user._id, name: user.name, email: user.email };
}
