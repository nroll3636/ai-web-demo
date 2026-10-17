// 初始化 Neon 数据库表结构
// 用法：npm run db:setup
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌ 未找到 DATABASE_URL，请先创建 .env 文件并粘贴 Neon 连接字符串");
  process.exit(1);
}

const sql = neon(url);

// 校园社区帖子表
await sql`
  CREATE TABLE IF NOT EXISTS posts (
    id BIGSERIAL PRIMARY KEY,
    module TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

console.log("✅ posts 表已就绪");
