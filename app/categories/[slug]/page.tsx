import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/features/blog/framework/PostList";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return new GetBlogDataUseCase()
    .getCategories()
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = new GetBlogDataUseCase();
  const label = blog.getTaxonomyLabel("category", slug);

  return {
    title: label ? `分類：${label}` : "分類",
    alternates: {
      canonical: `/categories/${slug}/`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = new GetBlogDataUseCase();
  const label = blog.getTaxonomyLabel("category", slug);
  const posts = blog.getPostsByCategory(slug);

  if (!label) {
    notFound();
  }

  return (
    <PageShell eyebrow="分類" title={label} description={`${posts.length} 篇文章`}>
      <PostList posts={posts} />
    </PageShell>
  );
}
