import Link from "next/link";
import { getModuleCounts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const modules = await getModuleCounts();

  return (
    <main className="container">
      <header>
        <h1>校园社区</h1>
        <p>一个简洁的校园交流空间：闲聊、技术、求助与活动公告。</p>
      </header>
      <section className="module-grid">
        {modules.map((m) => (
          <Link
            key={m.slug}
            href={`/posts?module=${encodeURIComponent(m.slug)}`}
            className="module-card"
          >
            <h2>{m.name}</h2>
            <p>{m.desc}</p>
            <span className="count">{m.count} 篇帖子</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
