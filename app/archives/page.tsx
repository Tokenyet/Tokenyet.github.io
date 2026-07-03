import type { Metadata } from "next";
import Link from "next/link";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";
import { formatDate } from "@/shared/utils/date";

export const metadata: Metadata = {
  title: "Archives",
  alternates: {
    canonical: "/archives/",
  },
};

export default function ArchivesPage() {
  const groups = new GetBlogDataUseCase().getPostsByYear();

  return (
    <PageShell
      eyebrow="Archives"
      title="All Posts"
      description="舊 Hexo 文章依原發表日期保留，文章 URL 也維持原本的 year/month/day/title 結構。"
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
