import { SignJWT, jwtVerify } from "jose";
import { SESSION_COOKIE } from "./auth-constants";

function secretKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export function useSecureCookies() {
  if (process.env.COOKIE_SECURE === "true") return true;
  if (process.env.COOKIE_SECURE === "false") return false;
  return process.env.NODE_ENV === "production" && Boolean(process.env.VERCEL);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: useSecureCookies(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  };
}

export async function signSessionToken(
  user: { _id: string; email: string; name: string },
  secret: string,
) {
  return new SignJWT({ email: user.email, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user._id))
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey(secret));
}

export async function verifySessionToken(token: string, secret: string) {
  const { payload } = await jwtVerify(token, secretKey(secret));
  return payload;
}

export { SESSION_COOKIE };
