import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const { meta, content } = getPostBySlug(slug);

    return (
      <article>
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-10 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          All posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <time className="text-sm text-gray-500">{meta.date}</time>
            {meta.tags.length > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <div className="flex flex-wrap gap-2">
                  {meta.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-blue-50 border border-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight">
            {meta.title}
          </h1>

          {meta.summary && (
            <p className="mt-4 text-lg text-gray-500 leading-relaxed max-w-2xl">
              {meta.summary}
            </p>
          )}
        </header>

        <div className="h-px w-full bg-gray-200 mb-10" />

        {/* Article body */}
        <div className="prose prose-gray max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:my-5
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-blockquote:border-l-4 prose-blockquote:border-blue-200 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
          prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
          prose-pre:bg-gray-950 prose-pre:text-gray-100
          prose-li:text-gray-700 prose-li:my-1.5
          prose-hr:border-gray-200">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
