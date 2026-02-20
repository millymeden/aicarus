"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function formatDate(iso: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function BlogClient({
  posts,
  featuredTags,
}: {
  posts: PostMeta[];
  featuredTags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    const rest = Array.from(set)
      .filter((t) => !featuredTags.includes(t))
      .sort();
    return [...featuredTags.filter((t) => set.has(t)), ...rest];
  }, [posts, featuredTags]);

  const filtered = useMemo(() => {
    const q = normalize(query);
    return posts.filter((p) => {
      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;
      const matchesQuery =
        !q ||
        normalize(p.title).includes(q) ||
        normalize(p.summary).includes(q) ||
        p.tags.some((t) => normalize(t).includes(q));
      return matchesTag && matchesQuery;
    });
  }, [posts, query, activeTag]);

  return (
    <div className="space-y-6">
      {/* Search row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M16.5 16.5 21 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/25"
          />
        </div>

        <div className="text-sm text-gray-500 sm:text-right">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeTag === null
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeTag === tag
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="panel">
        {filtered.map((p, idx) => {
          const primaryTag = p.tags?.[0] ?? "";
          return (
            <div key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block px-6 py-5 transition hover:bg-gray-50"
              >
                {/* meta row */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500">
                  {!!p.date && (
                    <span className="font-medium">{formatDate(p.date)}</span>
                  )}
                  {!!primaryTag && (
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                      {primaryTag}
                    </span>
                  )}
                </div>

                {/* title + arrow */}
                <div className="mt-2 flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {p.title}
                    </h2>

                    {!!p.summary && (
                      <p className="mt-1 text-gray-600">{p.summary}</p>
                    )}

                    {p.tags?.length > 1 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.slice(1).map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 pt-1 text-gray-300 group-hover:text-blue-600 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>

              {idx !== filtered.length - 1 && <div className="h-px bg-gray-200/70" />}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-600">
            No posts match your search/filter.
          </div>
        )}
      </div>
    </div>
  );
}