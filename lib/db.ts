import { neon } from "@neondatabase/serverless";
import { MODULES, type ModuleSlug } from "./modules";

const connectionString = process.env.DATABASE_URL || "";
const sql = neon(connectionString);

export type Post = {
  id: number;
  module: string;
  title: string;
  content: string;
  created_at: string;
};

export type ModuleCount = {
  slug: ModuleSlug;
  name: string;
  desc: string;
  count: number;
};

// 首页：统计每个板块的帖子数
export async function getModuleCounts(): Promise<ModuleCount[]> {
  const rows = await sql`
    SELECT module, count(*)::int AS count
    FROM posts
    GROUP BY module
  `;
  const map = new Map(rows.map((r) => [String(r.module), Number(r.count)]));
  return MODULES.map((m) => ({
    ...m,
    count: map.get(m.slug) ?? 0,
  }));
}

// 帖子列表：支持按板块筛选
export async function getPosts(module?: string): Promise<Post[]> {
  const rows = module
    ? await sql`
        SELECT id, module, title, content, created_at
        FROM posts
        WHERE module = ${module}
        ORDER BY created_at DESC
        LIMIT 100
      `
    : await sql`
        SELECT id, module, title, content, created_at
        FROM posts
        ORDER BY created_at DESC
        LIMIT 100
      `;
  return rows as unknown as Post[];
}

// 写入：新增帖子
export async function addPost(module: string, title: string, content: string) {
  await sql`
    INSERT INTO posts (module, title, content)
    VALUES (${module}, ${title}, ${content})
  `;
}
