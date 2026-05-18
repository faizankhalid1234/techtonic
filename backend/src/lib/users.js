import { hashPassword, verifyPassword } from "./auth.js";
import { isDbReady } from "../db.js";
import { User } from "../models/User.js";
import * as fileUsers from "../store/fileUsers.js";

export function useFileStore() {
  return !isDbReady();
}

export async function findUserByEmail(email) {
  if (isDbReady()) {
    return User.findOne({ email });
  }
  return fileUsers.fileFindByEmail(email);
}

export async function createUser({ name, email, password }) {
  if (isDbReady()) {
    return User.create({
      name,
      email,
      passwordHash: await hashPassword(password),
    });
  }
  try {
    return await fileUsers.fileCreateUser({ name, email, password });
  } catch (err) {
    if (err.code === "EMAIL_EXISTS") {
      const e = new Error("EMAIL_EXISTS");
      e.code = "EMAIL_EXISTS";
      throw e;
    }
    throw err;
  }
}

export async function verifyLogin(email, password) {
  if (isDbReady()) {
    const user = await User.findOne({ email });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return null;
    }
    return user;
  }
  return fileUsers.fileVerifyLogin(email, password);
}

export async function findUserById(id) {
  if (isDbReady()) {
    return User.findById(id).select("name email");
  }
  return fileUsers.fileFindById(id);
}
