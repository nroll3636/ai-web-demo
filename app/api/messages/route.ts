import { NextResponse } from "next/server";
import { addMessage } from "@/lib/db";

export async function POST(request: Request) {
  let body: { content?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const content = body.content?.trim();
  if (!content) {
    return NextResponse.json({ error: "内容不能为空" }, { status: 400 });
  }
  if (content.length > 200) {
    return NextResponse.json({ error: "内容过长（最多 200 字）" }, { status: 400 });
  }

  try {
    await addMessage(content);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("写入数据库失败:", err);
    return NextResponse.json(
      { error: "数据库写入失败，请检查 DATABASE_URL 是否配置正确" },
      { status: 500 }
    );
  }
}
