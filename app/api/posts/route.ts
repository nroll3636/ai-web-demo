import { NextResponse } from "next/server";
import { addPost } from "@/lib/db";
import { isModuleSlug } from "@/lib/modules";

export async function POST(request: Request) {
  let body: { module?: string; title?: string; content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const module = body.module?.trim() ?? "";
  const title = body.title?.trim() ?? "";
  const content = body.content?.trim() ?? "";

  if (!isModuleSlug(module)) {
    return NextResponse.json({ error: "无效的板块" }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "标题不能为空" }, { status: 400 });
  }
  if (title.length > 80) {
    return NextResponse.json(
      { error: "标题过长（最多 80 字）" },
      { status: 400 }
    );
  }
  if (!content) {
    return NextResponse.json({ error: "内容不能为空" }, { status: 400 });
  }
  if (content.length > 2000) {
    return NextResponse.json(
      { error: "内容过长（最多 2000 字）" },
      { status: 400 }
    );
  }

  try {
    await addPost(module, title, content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("写入数据库失败:", err);
    return NextResponse.json(
      { error: "数据库写入失败，请检查 DATABASE_URL 是否配置正确" },
      { status: 500 }
    );
  }
}
