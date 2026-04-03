import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  return (
    <article className="py-10">
      <div className="mb-8">
        <div className="kicker">Blog</div>
        <h1 className="h1">{meta.title}</h1>
        <p className="lead">{meta.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {meta.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#f3f6ff] px-3 py-1 text-xs font-medium text-gray-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500">{meta.date}</div>
        <div className="divider" />
      </div>

      <div className="article">
        <MDXRemote
          source={content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
