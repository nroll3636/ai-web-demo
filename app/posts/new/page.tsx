import PostForm from "@/app/PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <main className="container">
      <header>
        <h1>发布帖子</h1>
        <p>选择板块，填写标题和内容</p>
      </header>
      <div className="card">
        <PostForm />
      </div>
    </main>
  );
}
