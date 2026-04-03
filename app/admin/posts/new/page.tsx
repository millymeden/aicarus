import PostEditor from "../../components/PostEditor";
import AdminLogoutButton from "../../components/AdminLogoutButton";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-700 transition">
            ← Dashboard
          </Link>
          <h1 className="text-lg font-bold text-gray-900 mt-0.5">New post</h1>
        </div>
        <AdminLogoutButton />
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <PostEditor isNew={true} />
      </main>
    </div>
  );
}
