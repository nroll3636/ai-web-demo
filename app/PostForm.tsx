"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MODULES, type ModuleSlug } from "@/lib/modules";

export default function PostForm() {
  const [module, setModule] = useState<ModuleSlug>(MODULES[0].slug);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim() || loading) return;

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module,
          title: title.trim(),
          content: content.trim(),
        }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        setStatus("发布成功 ✔");
        router.push("/posts");
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        setStatus(data?.error || "发布失败，请重试");
      }
    } catch {
      setStatus("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="post-form" onSubmit={handleSubmit}>
        <label>
          选择板块
          <select
            value={module}
            onChange={(e) => setModule(e.target.value as ModuleSlug)}
          >
            {MODULES.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          标题
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入标题"
            maxLength={80}
            required
          />
        </label>

        <label>
          内容
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="请输入内容"
            rows={6}
            maxLength={2000}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "提交中…" : "发布"}
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </>
  );
}
