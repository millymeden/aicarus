import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, createSessionToken, setSessionCookie } from "@/lib/admin/auth";
import { recordFailedAttempt, isLocked, clearAttempts } from "@/lib/admin/rateLimit";

export async function POST(req: NextRequest) {
  // Get the real IP (Vercel sets x-forwarded-for)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  // Check if this IP is currently locked out
  if (isLocked(ip)) {
    return NextResponse.json(
      { error: "Too many failed attempts. Please wait 15 minutes and try again." },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { username = "", password = "" } = body;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const valid = checkCredentials(username, password);

  if (!valid) {
    const result = recordFailedAttempt(ip);
    const message = result.locked
      ? "Too many failed attempts. You are locked out for 15 minutes."
      : `Incorrect username or password. ${result.remaining} attempt${result.remaining === 1 ? "" : "s"} remaining.`;
    return NextResponse.json({ error: message }, { status: 401 });
  }

  // Credentials correct — clear any recorded failures and issue session
  clearAttempts(ip);
  const token = await createSessionToken();
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
