/** Shared JWT secret for session cookies (login / signup / checkout). */
const FALLBACK =
  "techtonic_dev_secret_2026_fk509";

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  return secret || FALLBACK;
}
