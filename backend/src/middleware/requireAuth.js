import { verifySessionToken, SESSION_COOKIE } from "../lib/auth.js";
import { findUserById } from "../lib/users.js";

export async function requireAuth(req, res, next) {
  const secret = process.env.JWT_SECRET;
  const token = req.cookies?.[SESSION_COOKIE];
  if (!secret || !token) {
    return res.status(401).json({ error: "Sign in required." });
  }
  try {
    const payload = await verifySessionToken(token, secret);
    const user = await findUserById(payload.sub);
    if (!user) {
      return res.status(401).json({ error: "Session expired." });
    }
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid session." });
  }
}
