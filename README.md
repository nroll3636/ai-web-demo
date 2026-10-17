# AI Web Demo

基于 **Next.js + Neon (PostgreSQL)** 的简单 Web 项目，用于课堂演示：
- 首页展示数据库查询结果（最近 50 条留言）
- 表单写入数据到数据库
- 部署到 Vercel

## 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 配置数据库（复制 .env.example 为 .env，填入 Neon 连接字符串）
npm run db:setup   # 初始化数据库表
npm run db:test    # 测试数据库读写

# 3. 启动开发服务器
npm run dev        # 访问 http://localhost:3000
```

## 部署到 Vercel

```bash
npm i -g vercel
vercel login
vercel
```
