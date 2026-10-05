/**
 * Session HMAC secret. Always use this constant so Edge/Node/API never disagree
 * about which secret signed the cookie (env-only secrets break checkout middleware).
 */
export const SESSION_SECRET = "techtonic_dev_secret_2026_fk509";

export function getJwtSecret(): string {
  return SESSION_SECRET;
}

/** Secrets accepted when verifying older cookies (env may have signed some). */
export function jwtVerifySecrets(): string[] {
  const extras = [process.env.JWT_SECRET?.trim(), SESSION_SECRET].filter(
    (s): s is string => Boolean(s && s.length > 0),
  );
  return [...new Set(extras)];
}
