import type { NextConfig } from "next";

// Pages that are temporarily hidden. Their code and content are untouched
// (app/about, app/basics, app/blog, app/visual, content/blog); visitors are
// just sent to the home page for now. `permanent: false` keeps search engines
// from treating the move as final. To bring a page back, delete its lines here
// and re-enable its tab in app/components/Navbar.tsx.
const HIDDEN_PAGES = ["/about", "/basics", "/visual", "/blog", "/blog/:slug"];

const nextConfig: NextConfig = {
  async redirects() {
    return HIDDEN_PAGES.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
