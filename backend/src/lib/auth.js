import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "techtonic_session";

export async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function secretKey(secret) {
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(user, secret) {
  return new SignJWT({
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user._id ?? user.id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey(secret));
}

export async function verifySessionToken(token, secret) {
  const { payload } = await jwtVerify(token, secretKey(secret));
  return payload;
}

export function sessionCookieOptions() {
  const secure =
    process.env.COOKIE_SECURE === "true" ||
    (process.env.NODE_ENV === "production" &&
      process.env.COOKIE_SECURE !== "false" &&
      Boolean(process.env.VERCEL));
  return {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}
