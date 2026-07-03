import type { Post } from "@/features/blog/entity/types";
import { PostCard } from "@/features/blog/framework/PostCard";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-zinc-600">No posts found.</p>;
  }

  return (
    <div className="divide-y divide-zinc-200">
      {posts.map((post) => (
        <PostCard key={post.routePath} post={post} />
      ))}
    </div>
  );
}
