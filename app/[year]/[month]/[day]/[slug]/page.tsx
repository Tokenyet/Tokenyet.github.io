import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/features/blog/framework/ArticleBody";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { taxonomySlug } from "@/features/blog/adapter/slug";
import { formatDate } from "@/shared/utils/date";

export const dynamicParams = false;

export function generateStaticParams() {
  return new GetBlogDataUseCase().getAllPosts().map((post) => {
    const [, year, month, day, slug] = post.routePath.split("/");
    if (!year || !month || !day || !slug) {
      throw new Error(`Invalid route path: ${post.routePath}`);
    }

    return { year, month, day, slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
}): Promise<Metadata> {
  const post = new GetBlogDataUseCase().getPostByRoute(await params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.routePath,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: post.routePath,
      publishedTime: post.date.toISOString(),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ year: string; month: string; day: string; slug: string }>;
}) {
  const post = new GetBlogDataUseCase().getPostByRoute(await params);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <article className="mx-auto max-w-[var(--article-width)]">
        <header className="mb-8 border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
            {post.categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${taxonomySlug(category)}/`}
                className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800 hover:bg-emerald-100"
              >
                {category}
              </Link>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
            {post.title}
          </h1>
        </header>
        <ArticleBody html={post.contentHtml} />
      </article>
    </main>
  );
}
