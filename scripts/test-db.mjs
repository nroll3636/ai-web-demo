// 测试 Neon 数据库读写
// 用法：npm run db:test
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌ 未找到 DATABASE_URL，请先创建 .env 文件并粘贴 Neon 连接字符串");
  process.exit(1);
}

const sql = neon(url);

// 写入测试
await sql`
  INSERT INTO posts (module, title, content)
  VALUES ('闲聊', '本地连通测试', '数据库读写正常')
`;

// 读取测试
const rows = await sql`SELECT count(*)::int AS n FROM posts`;
console.log("✅ 数据库读写正常，当前帖子总数:", rows[0].n);
