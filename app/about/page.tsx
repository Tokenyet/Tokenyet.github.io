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
      eyebrow="About"
      title={about.title}
      description="舊站自我介紹內容已轉移；過時的第三方 gallery script 沒有在新站執行。"
    >
      <article className="max-w-[var(--article-width)]">
        <ArticleBody html={about.html} />
      </article>
    </PageShell>
  );
}
