import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import AdminLogoutButton from "./components/AdminLogoutButton";
import AdminDeleteButton from "./components/AdminDeleteButton";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Aicarus Admin</h1>
          <p className="text-xs text-gray-500 mt-0.5">Content dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-lg px-4 py-2 transition"
          >
            <span className="text-base leading-none">+</span> New post
          </Link>
          <AdminLogoutButton />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Blog posts ({posts.length})
        </h2>

        {posts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-sm">No posts yet.</p>
            <Link
              href="/admin/posts/new"
              className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
            >
              Write your first post →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li
                key={post.slug}
                className="bg-white rounded-2xl border border-gray-200 px-6 py-4 flex items-start justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{post.title}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{post.date}</p>
                  {post.summary && (
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{post.summary}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="text-sm text-gray-400 hover:text-gray-700 transition"
                    title="View on site"
                  >
                    ↗
                  </Link>
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    Edit
                  </Link>
                  <AdminDeleteButton slug={post.slug} title={post.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
