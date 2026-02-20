import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const { meta, content } = getPostBySlug(slug);

    return (
      <article className="py-10">
        <div className="mb-8">
          <div className="text-sm text-gray-500">{meta.date}</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900">
            {meta.title}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">{meta.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {meta.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* MDX content styling */}
        <div className="prose prose-gray max-w-none prose-h2:mt-10 prose-h2:scroll-mt-28 prose-a:text-blue-700">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}