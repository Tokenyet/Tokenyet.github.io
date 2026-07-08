import type { Metadata } from "next";
import { TaxonomyList } from "@/features/blog/framework/TaxonomyList";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "分類",
  alternates: {
    canonical: "/categories/",
  },
};

export default function CategoriesPage() {
  const categories = new GetBlogDataUseCase().getCategories();

  return (
    <PageShell
      title="分類"
      description="依主題瀏覽文章。"
    >
      <TaxonomyList basePath="/categories" items={categories} />
    </PageShell>
  );
}
