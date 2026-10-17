import { neon } from "@neondatabase/serverless";

// 从环境变量读取 Neon 数据库连接字符串
// 本地开发读取 .env 文件（Next.js 自动加载）；线上读取 Vercel 配置的环境变量
const connectionString = process.env.DATABASE_URL || "";
const sql = neon(connectionString);

export type Message = {
  id: number;
  content: string;
  created_at: string;
};

// 查询示例：读取最近 50 条留言
export async function getMessages(): Promise<Message[]> {
  const rows = await sql`SELECT id, content, created_at FROM messages ORDER BY created_at DESC LIMIT 50`;
  return rows as unknown as Message[];
}

// 写入示例：新增一条留言
export async function addMessage(content: string) {
  await sql`INSERT INTO messages (content) VALUES (${content})`;
}
