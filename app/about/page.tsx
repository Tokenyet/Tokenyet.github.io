import type { Metadata } from "next";
import { getAboutPage } from "@/features/blog/adapter/pageRepository";
import { ArticleBody } from "@/features/blog/framework/ArticleBody";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "About",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutPage() {
  const about = getAboutPage();

  return (
    <PageShell
      title={about.title}
      description="關於 Dowen 的背景、興趣與學習方向。"
    >
      <article className="max-w-[var(--article-width)]">
        <ArticleBody html={about.html} />
      </article>
    </PageShell>
  );
}
