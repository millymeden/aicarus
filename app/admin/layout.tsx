// Admin segment layout — no <html>/<body> (those come from the root layout).
// The root layout wraps everything in SiteShell, but SiteShell checks the pathname
// and renders nothing extra for /admin/* routes, so admin pages are fully isolated.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
