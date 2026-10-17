import Link from "next/link";
import { getPosts } from "@/lib/db";
import { MODULES, isModuleSlug } from "@/lib/modules";

export const dynamic = "force-dynamic";

const FILTERS = [
  { slug: "", label: "全部" },
  ...MODULES.map((m) => ({ slug: m.slug, label: m.slug })),
];

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const { module } = await searchParams;
  const current = module && isModuleSlug(module) ? module : "";
  const posts = await getPosts(current || undefined);

  return (
    <main className="container">
      <header>
        <h1>帖子列表</h1>
        <p>按板块浏览最新帖子</p>
      </header>

      <div className="filters">
        {FILTERS.map((f) => {
          const href = f.slug
            ? `/posts?module=${encodeURIComponent(f.slug)}`
            : "/posts";
          const active = f.slug === current;
          return (
            <Link
              key={f.label}
              href={href}
              className={active ? "filter-btn active" : "filter-btn"}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {posts.length === 0 ? (
        <p className="empty">还没有帖子，去发第一篇吧。</p>
      ) : (
        <ul className="post-list">
          {posts.map((p) => (
            <li key={p.id} className="post-card">
              <h2 className="post-title">{p.title}</h2>
              <div className="post-meta">
                <span className="badge">{p.module}</span>
                <span className="time">
                  {new Date(p.created_at).toLocaleString("zh-CN")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
