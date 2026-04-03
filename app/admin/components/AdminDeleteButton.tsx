"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminDeleteButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/posts?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Delete failed.");
        setConfirming(false);
      } else {
        router.refresh();
      }
    } catch {
      setError("Something went wrong.");
      setConfirming(false);
    } finally {
      setLoading(false);
    }
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Delete &ldquo;{title}&rdquo;?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
        >
          {loading ? "Deleting…" : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-400 hover:text-gray-700"
        >
          Cancel
        </button>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm font-medium text-red-400 hover:text-red-600 transition"
    >
      Delete
    </button>
  );
}
