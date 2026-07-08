import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/features/blog/framework/PostList";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return new GetBlogDataUseCase().getTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = new GetBlogDataUseCase();
  const label = blog.getTaxonomyLabel("tag", slug);

  return {
    title: label ? `標籤：${label}` : "標籤",
    alternates: {
      canonical: `/tags/${slug}/`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = new GetBlogDataUseCase();
  const label = blog.getTaxonomyLabel("tag", slug);
  const posts = blog.getPostsByTag(slug);

  if (!label) {
    notFound();
  }

  return (
    <PageShell eyebrow="標籤" title={label} description={`${posts.length} 篇文章`}>
      <PostList posts={posts} />
    </PageShell>
  );
}
