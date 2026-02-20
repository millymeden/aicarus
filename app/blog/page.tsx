import { getAllPosts } from "@/lib/posts";
import BlogClient from "./ui/BlogClient";

export default function BlogPage() {
  const posts = getAllPosts();

  const featuredTags = [
    "Technical",
    "Policy",
    "Supply Chain",
    "Economics",
    "Geopolitics",
    "Hardware",
    "Governance",
    "Interviews",
  ];

  return (
    <>
      {/* Page header */}
      <div>
        <div className="kicker">Blog</div>
        <h1 className="h1">Making Sense of AI?</h1>
        <p className="lead">
          Clear explainers, analysis, and interviews on AI safety, policy, and
          the forces shaping where we’re headed.
        </p>
        <div className="divider" />
      </div>

      <BlogClient posts={posts} featuredTags={featuredTags} />
    </>
  );
}