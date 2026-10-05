import { SignJWT, jwtVerify } from "jose";
import { SESSION_COOKIE } from "./auth-constants";
import { jwtVerifySecrets } from "./jwt-secret";

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

export async function verifySessionToken(token: string, _secret?: string) {
  const secrets = jwtVerifySecrets();
  if (_secret?.trim()) secrets.unshift(_secret.trim());
  const unique = [...new Set(secrets)];
  let lastErr: unknown;
  for (const secret of unique) {
    try {
      const { payload } = await jwtVerify(token, secretKey(secret));
      return payload;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr ?? new Error("Invalid session");
}

export { SESSION_COOKIE };
