import { NextRequest, NextResponse } from "next/server";
import {
  ACCOUNTS_COOKIE,
  cookieCreateUser,
  cookieFindByEmail,
  cookieFindById,
  cookieVerifyLogin,
} from "./cookie-accounts";
import { getJwtSecret } from "./jwt-secret";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSessionToken,
  verifySessionToken,
} from "./session";
import * as users from "./users";

function publicUser(user: { name: string; email: string }) {
  return { name: user.name, email: user.email };
}

function accountsCookieOptions() {
  return {
    ...sessionCookieOptions(),
    maxAge: 365 * 24 * 60 * 60,
  };
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
    const secret = getJwtSecret();
    const accountsTok = req.cookies.get(ACCOUNTS_COOKIE)?.value;

    const existingDurable = await users.findUserByEmail(normalized);
    const existingCookie = await cookieFindByEmail(
      accountsTok,
      secret,
      normalized,
    );
    if (existingDurable || existingCookie) {
      return NextResponse.json(
        { error: "An account with this email already exists. Please sign in." },
        { status: 409 },
      );
    }

    let user: { _id: string; name: string; email: string };
    let nextAccounts: string | undefined;

    try {
      user = await users.createUser({
        name: String(name).trim(),
        email: normalized,
        password: String(password),
      });
    } catch (err) {
      if ((err as { code?: string }).code === "EMAIL_EXISTS") {
        return NextResponse.json(
          {
            error:
              "An account with this email already exists. Please sign in.",
          },
          { status: 409 },
        );
      }
      if ((err as Error).message !== "DATABASE_UNAVAILABLE") {
        throw err;
      }
      const created = await cookieCreateUser(accountsTok, secret, {
        name: String(name).trim(),
        email: normalized,
        password: String(password),
      });
      user = created.user;
      nextAccounts = created.accountsToken;
    }

    const token = await signSessionToken(user, secret);
    const res = NextResponse.json(
      { user: publicUser(user) },
      { status: 201 },
    );
    res.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    if (nextAccounts) {
      res.cookies.set(ACCOUNTS_COOKIE, nextAccounts, accountsCookieOptions());
    }
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
    const secret = getJwtSecret();
    const accountsTok = req.cookies.get(ACCOUNTS_COOKIE)?.value;

    let user =
      (await users.verifyLogin(normalized, String(password))) ??
      (await cookieVerifyLogin(
        accountsTok,
        secret,
        normalized,
        String(password),
      ));

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
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
  const secret = getJwtSecret();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  try {
    const payload = await verifySessionToken(token, secret);
    const sub = payload.sub;
    if (!sub) return NextResponse.json({ user: null });

    const fromStore =
      (await users.findUserById(String(sub))) ??
      (await cookieFindById(
        req.cookies.get(ACCOUNTS_COOKIE)?.value,
        secret,
        String(sub),
      ));
    if (fromStore) {
      return NextResponse.json({ user: publicUser(fromStore) });
    }

    const email = typeof payload.email === "string" ? payload.email : null;
    const name = typeof payload.name === "string" ? payload.name : null;
    if (email && name) {
      return NextResponse.json({ user: { name, email } });
    }
    return NextResponse.json({ user: null });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function requireUser(req: NextRequest) {
  const secret = getJwtSecret();
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = await verifySessionToken(token, secret);
    const sub = payload.sub;
    if (!sub) return null;

    const fromStore =
      (await users.findUserById(String(sub))) ??
      (await cookieFindById(
        req.cookies.get(ACCOUNTS_COOKIE)?.value,
        secret,
        String(sub),
      ));
    if (fromStore) return fromStore;

    const email = typeof payload.email === "string" ? payload.email : null;
    const name = typeof payload.name === "string" ? payload.name : null;
    if (email && name) {
      return { _id: String(sub), name, email };
    }
    return null;
  } catch {
    return null;
  }
}
