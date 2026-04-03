import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import PostEditor from "../../components/PostEditor";
import AdminLogoutButton from "../../components/AdminLogoutButton";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params;

  let post: ReturnType<typeof getPostBySlug>;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { meta, content } = post;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Dashboard
          </Link>
          <h1 className="text-lg font-bold text-gray-900 mt-0.5 truncate max-w-lg">
            {meta.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/blog/${slug}`}
            target="_blank"
            className="text-sm text-gray-400 hover:text-gray-700 transition"
          >
            View on site ↗
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <PostEditor
          isNew={false}
          initialSlug={slug}
          initialTitle={meta.title}
          initialDate={meta.date}
          initialSummary={meta.summary}
          initialTags={meta.tags.join(", ")}
          initialBody={content}
        />
      </main>
    </div>
  );
}
