import type { Metadata } from "next";
import Link from "next/link";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";
import { formatDate } from "@/shared/utils/date";

export const metadata: Metadata = {
  title: "文章",
  description: "Dowen 的技術筆記、舊文章與偶爾整理的工程紀錄。",
  alternates: {
    canonical: "/archives/",
  },
};

export default function ArchivesPage() {
  const groups = new GetBlogDataUseCase().getPostsByYear();

  return (
    <PageShell
      eyebrow="文章"
      title="技術筆記與舊文章"
      description="依時間整理過去的技術筆記、遊戲開發紀錄與工具實驗。作品集是首頁主體，文章保留作為脈絡與技術證據。"
    >
      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.year}>
            <h2 className="mb-3 text-2xl font-semibold text-zinc-950">
              {group.year}
            </h2>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {group.posts.map((post) => (
                <Link
                  key={post.routePath}
                  href={post.routePath}
                  className="grid gap-2 py-3 text-sm hover:bg-zinc-100 sm:grid-cols-[120px_1fr]"
                >
                  <time className="text-zinc-500" dateTime={post.date.toISOString()}>
                    {formatDate(post.date)}
                  </time>
                  <span className="font-medium text-zinc-950">{post.title}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
