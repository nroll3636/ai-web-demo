import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "校园社区",
  description: "闲聊、技术交流、求助与活动公告",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <nav className="nav">
          <Link href="/" className="nav-brand">
            校园社区
          </Link>
          <div className="nav-links">
            <Link href="/posts">帖子列表</Link>
            <Link href="/posts/new">发帖</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
