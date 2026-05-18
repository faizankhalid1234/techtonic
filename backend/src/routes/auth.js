import { Router } from "express";
import {
  SESSION_COOKIE,
  signSessionToken,
  verifySessionToken,
  sessionCookieOptions,
} from "../lib/auth.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
  verifyLogin,
  useFileStore,
} from "../lib/users.js";

export const authRouter = Router();

function setSession(res, token) {
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions());
}

function publicUser(user) {
  return { name: user.name, email: user.email };
}

authRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }
    const normalized = String(email).trim().toLowerCase();
    const exists = await findUserByEmail(normalized);
    if (exists) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }
    const user = await createUser({
      name: String(name).trim(),
      email: normalized,
      password: String(password),
    });
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "Server misconfigured." });
    }
    const token = await signSessionToken(user, secret);
    setSession(res, token);
    return res.status(201).json({
      user: publicUser(user),
      storage: useFileStore() ? "local" : "mongodb",
    });
  } catch (err) {
    if (err.code === "EMAIL_EXISTS") {
      return res.status(409).json({ error: "An account with this email already exists." });
    }
    console.error("register", err);
    return res.status(500).json({ error: "Could not create account." });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const normalized = String(email).trim().toLowerCase();
    const user = await verifyLogin(normalized, String(password));
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: "Server misconfigured." });
    }
    const token = await signSessionToken(user, secret);
    setSession(res, token);
    return res.json({ user: publicUser(user) });
  } catch (err) {
    console.error("login", err);
    return res.status(500).json({ error: "Login failed." });
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  return res.json({ ok: true });
});

authRouter.get("/me", async (req, res) => {
  const secret = process.env.JWT_SECRET;
  const token = req.cookies?.[SESSION_COOKIE];
  if (!secret || !token) {
    return res.json({ user: null });
  }
  try {
    const payload = await verifySessionToken(token, secret);
    const user = await findUserById(payload.sub);
    if (!user) {
      return res.json({ user: null });
    }
    return res.json({ user: publicUser(user) });
  } catch {
    return res.json({ user: null });
  }
});
