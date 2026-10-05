import { randomUUID } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { hashPassword, verifyPassword } from "./password";

export const ACCOUNTS_COOKIE = "techtonic_accounts";

type StoredUser = {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
};

function key(secret: string) {
  return new TextEncoder().encode(secret);
}

export async function readAccounts(
  token: string | undefined,
  secret: string,
): Promise<StoredUser[]> {
  if (!token) return [];
  try {
    const { payload } = await jwtVerify(token, key(secret));
    const users = payload.users;
    return Array.isArray(users) ? (users as StoredUser[]) : [];
  } catch {
    return [];
  }
}

export async function writeAccountsToken(users: StoredUser[], secret: string) {
  return new SignJWT({ users })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(key(secret));
}

export async function cookieFindByEmail(
  token: string | undefined,
  secret: string,
  email: string,
) {
  const users = await readAccounts(token, secret);
  return users.find((u) => u.email === email) ?? null;
}

export async function cookieCreateUser(
  token: string | undefined,
  secret: string,
  {
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  },
) {
  const users = await readAccounts(token, secret);
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
  };
  users.push(user);
  const accountsToken = await writeAccountsToken(users, secret);
  return { user, accountsToken };
}

export async function cookieVerifyLogin(
  token: string | undefined,
  secret: string,
  email: string,
  password: string,
) {
  const user = await cookieFindByEmail(token, secret, email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return null;
  }
  return user;
}

export async function cookieFindById(
  token: string | undefined,
  secret: string,
  id: string,
) {
  const users = await readAccounts(token, secret);
  const user = users.find((u) => u._id === id);
  if (!user) return null;
  return { _id: user._id, name: user.name, email: user.email };
}
