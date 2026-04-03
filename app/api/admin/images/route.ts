import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin/auth";
import { upsertBinaryFile } from "@/lib/admin/github";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
const MAX_SIZE_MB = 5;

export async function POST(req: NextRequest) {
  if (!(await getSessionFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, GIF, WebP, and SVG images are allowed." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (buffer.byteLength > MAX_SIZE_MB * 1024 * 1024) {
    return NextResponse.json(
      { error: `Image must be under ${MAX_SIZE_MB}MB.` },
      { status: 400 }
    );
  }

  // Sanitise the filename
  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");

  const filePath = `public/images/blog/${safeName}`;

  try {
    await upsertBinaryFile(filePath, buffer, `admin: upload image "${safeName}"`);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to upload image to GitHub." }, { status: 500 });
  }

  // The public URL after Vercel deploys
  const publicUrl = `/images/blog/${safeName}`;
  return NextResponse.json({ ok: true, url: publicUrl });
}
