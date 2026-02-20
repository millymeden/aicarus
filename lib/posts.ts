import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): PostMeta[] {
  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))
    : [];

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, filename);
    const file = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(file);

    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      summary: String(data.summary ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    } satisfies PostMeta;
  });

  // newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    summary: String(data.summary ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };

  return { meta, content };
}