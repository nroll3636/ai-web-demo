"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MessageForm() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (res.ok) {
        setContent("");
        setStatus("写入成功 ✔");
        router.refresh();
      } else {
        const data = await res.json().catch(() => null);
        setStatus(data?.error || "写入失败，请重试");
      }
    } catch {
      setStatus("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="输入一条留言，测试数据库写入…"
          maxLength={200}
        />
        <button type="submit" disabled={loading}>
          {loading ? "提交中…" : "写入数据库"}
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </>
  );
}
