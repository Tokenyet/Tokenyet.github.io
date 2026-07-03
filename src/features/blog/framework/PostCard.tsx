/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Post } from "@/features/blog/entity/types";
import { formatDate } from "@/shared/utils/date";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="grid gap-4 border-b border-zinc-200 py-6 last:border-b-0 sm:grid-cols-[160px_1fr]">
      <Link
        href={post.routePath}
        className="block overflow-hidden rounded-md bg-zinc-100"
        aria-label={post.title}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100 text-sm text-zinc-400">
            Dowen
          </div>
        )}
      </Link>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
          {post.categories.map((category) => (
            <span key={category} className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-800">
              {category}
            </span>
          ))}
        </div>
        <h2 className="mt-2 text-xl font-semibold tracking-normal text-zinc-950">
          <Link href={post.routePath} className="hover:text-emerald-700">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">
          {post.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 8).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
