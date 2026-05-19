import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSessionToken,
  verifySessionToken,
} from "./session";
import * as users from "./file-users";

function publicUser(user: { name: string; email: string }) {
  return { name: user.name, email: user.email };
}

function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return secret;
}

export async function handleRegister(req: NextRequest) {
  try {
    const { name, email, password } = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };
    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 },
      );
    }
    if (String(password).length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }
    const normalized = String(email).trim().toLowerCase();
    const exists = await users.findUserByEmail(normalized);
    if (exists) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 409 },
      );
    }
    const secret = jwtSecret();
    if (!secret) {
      return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
    }
    const user = await users.createUser({
      name: String(name).trim(),
      email: normalized,
      password: String(password),
    });
    const token = await signSessionToken(user, secret);
    const res = NextResponse.json(
      { user: publicUser(user) },
      { status: 201 },
    );
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    const code = (err as { code?: string }).code;
    if (code === "EMAIL_EXISTS") {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 409 },
      );
    }
    console.error("register", err);
    return NextResponse.json(
      { error: "Could not create account. Please try again." },
      { status: 500 },
    );
  }
}

export async function handleLogin(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };
    if (!email?.trim() || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }
    const normalized = String(email).trim().toLowerCase();
    const user = await users.verifyLogin(normalized, String(password));
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }
    const secret = jwtSecret();
    if (!secret) {
      return NextResponse.json({ error: "Server misconfigured." }, { status: 500 });
    }
    const token = await signSessionToken(user, secret);
    const res = NextResponse.json({ user: publicUser(user) });
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("login", err);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}

export async function handleLogout() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return res;
}

export async function handleMe(req: NextRequest) {
  const secret = jwtSecret();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!secret || !token) {
    return NextResponse.json({ user: null });
  }
  try {
    const payload = await verifySessionToken(token, secret);
    const sub = payload.sub;
    if (!sub) return NextResponse.json({ user: null });
    const user = await users.findUserById(String(sub));
    if (!user) return NextResponse.json({ user: null });
    return NextResponse.json({ user: publicUser(user) });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function requireUser(req: NextRequest) {
  const secret = jwtSecret();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!secret || !token) return null;
  try {
    const payload = await verifySessionToken(token, secret);
    const sub = payload.sub;
    if (!sub) return null;
    return users.findUserById(String(sub));
  } catch {
    return null;
  }
}
