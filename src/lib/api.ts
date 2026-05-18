export async function parseJsonResponse<T>(res: Response): Promise<T | null> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export function authErrorMessage(
  res: Response,
  data: { error?: string } | null,
  fallback: string,
): string {
  if (res.status === 502 || res.status === 504) {
    return "Server is not running. Start the backend: cd backend && npm run dev";
  }
  if (typeof data?.error === "string" && data.error.length > 0) {
    return data.error;
  }
  if (res.status === 401) return "Invalid email or password.";
  if (res.status === 409) return "An account with this email already exists.";
  return fallback;
}
