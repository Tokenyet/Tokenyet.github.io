import type { Metadata } from "next";
import { TaxonomyList } from "@/features/blog/framework/TaxonomyList";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "Categories",
  alternates: {
    canonical: "/categories/",
  },
};

export default function CategoriesPage() {
  const categories = new GetBlogDataUseCase().getCategories();

  return (
    <PageShell
      eyebrow="Categories"
      title="Categories"
      description="依舊站分類整理文章。"
    >
      <TaxonomyList basePath="/categories" items={categories} />
    </PageShell>
  );
}
