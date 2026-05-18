import { NextRequest, NextResponse } from "next/server";

const backend =
  process.env.BACKEND_URL?.replace(/\/$/, "") || "http://127.0.0.1:4000";

export async function proxyToBackend(
  req: NextRequest,
  path: string,
  init?: RequestInit,
) {
  const url = `${backend}${path}`;
  const headers = new Headers(init?.headers);
  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  if (!headers.has("content-type") && init?.body) {
    headers.set("content-type", "application/json");
  }

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Cannot reach API. Run: cd backend && npm run dev" },
      { status: 502 },
    );
  }

  const text = await res.text();
  const out = new NextResponse(text, {
    status: res.status,
    headers: { "content-type": "application/json" },
  });

  const setCookies =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : [];
  if (setCookies.length > 0) {
    for (const c of setCookies) {
      out.headers.append("Set-Cookie", c);
    }
  } else {
    const single = res.headers.get("set-cookie");
    if (single) out.headers.append("Set-Cookie", single);
  }

  return out;
}
