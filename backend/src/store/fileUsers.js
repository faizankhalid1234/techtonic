import { randomUUID } from "crypto";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import { hashPassword, verifyPassword } from "../lib/auth.js";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function readAll() {
  try {
    const raw = await readFile(USERS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(users) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export async function fileFindByEmail(email) {
  const users = await readAll();
  return users.find((u) => u.email === email) ?? null;
}

export async function fileCreateUser({ name, email, password }) {
  const users = await readAll();
  if (users.some((u) => u.email === email)) {
    const err = new Error("EMAIL_EXISTS");
    err.code = "EMAIL_EXISTS";
    throw err;
  }
  const user = {
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

export async function fileVerifyLogin(email, password) {
  const user = await fileFindByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return null;
  }
  return user;
}

export async function fileFindById(id) {
  const users = await readAll();
  const user = users.find((u) => u._id === id);
  if (!user) return null;
  return { _id: user._id, name: user.name, email: user.email };
}
