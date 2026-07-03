import type { Metadata } from "next";
import { TaxonomyList } from "@/features/blog/framework/TaxonomyList";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "Tags",
  alternates: {
    canonical: "/tags/",
  },
};

export default function TagsPage() {
  const tags = new GetBlogDataUseCase().getTags();

  return (
    <PageShell
      eyebrow="Tags"
      title="Tags"
      description="依舊站標籤整理文章。"
    >
      <TaxonomyList basePath="/tags" items={tags} />
    </PageShell>
  );
}
