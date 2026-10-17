import { getMessages } from "@/lib/db";
import MessageForm from "./MessageForm";

// 每次请求实时查询数据库（不在构建时执行，避免缺少环境变量时报错）
export const dynamic = "force-dynamic";

export default async function Home() {
  const messages = await getMessages();

  return (
    <main className="container">
      <header>
        <h1>AI Web Demo</h1>
        <p>Next.js + Neon PostgreSQL 数据库读写示例</p>
      </header>

      <div className="card">
        <span className="badge">数据库写入示例</span>
        <MessageForm />
      </div>

      <div className="card">
        <h2 className="section-title">数据库查询示例（最近 50 条留言）</h2>
        {messages.length === 0 ? (
          <p className="empty">还没有数据，先在下方输入一条留言吧。</p>
        ) : (
          <ul className="list">
            {messages.map((m) => (
              <li key={m.id}>
                <span>{m.content}</span>
                <span className="time">
                  {new Date(m.created_at).toLocaleString("zh-CN")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
