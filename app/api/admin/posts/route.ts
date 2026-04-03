import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/admin/auth";
import { upsertFile, deleteFile, buildMdxContent } from "@/lib/admin/github";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// POST /api/admin/posts — create or update a post
export async function POST(req: NextRequest) {
  if (!(await getSessionFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    slug?: string;
    title?: string;
    date?: string;
    summary?: string;
    tags?: string;
    body?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, date, summary, tags, body: mdxBody } = body;

  if (!title || !date || !mdxBody) {
    return NextResponse.json(
      { error: "title, date, and body are required." },
      { status: 400 }
    );
  }

  // Use provided slug (for edits) or generate from title (for new posts)
  const slug = body.slug && body.slug.trim() ? body.slug.trim() : slugify(title);

  const tagList = (tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const content = buildMdxContent({
    title,
    date,
    summary: summary ?? "",
    tags: tagList,
    body: mdxBody,
  });

  const filePath = `content/blog/${slug}.mdx`;

  try {
    await upsertFile(
      filePath,
      content,
      `admin: ${body.slug ? "update" : "create"} post "${title}"`
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save post to GitHub." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, slug });
}

// DELETE /api/admin/posts?slug=... — delete a post
export async function DELETE(req: NextRequest) {
  if (!(await getSessionFromRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  try {
    await deleteFile(`content/blog/${slug}.mdx`, `admin: delete post "${slug}"`);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
