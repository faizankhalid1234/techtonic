/** Production API on Vercel. Set BACKEND_URL in .env.local for local backend. */
export const DEFAULT_BACKEND_URL = "https://backend-techtonic.vercel.app";

export function resolveBackendUrl(envUrl?: string) {
  return envUrl?.replace(/\/$/, "") || DEFAULT_BACKEND_URL;
}
