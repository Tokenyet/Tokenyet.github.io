import Link from "next/link";
import { ArrowRight, FolderKanban, Rss } from "lucide-react";
import { PostList } from "@/features/blog/framework/PostList";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { ProjectSummary } from "@/features/projects/framework/ProjectSummary";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";

export default function HomePage() {
  const blog = new GetBlogDataUseCase();
  const projects = new GetProjectsUseCase().getProjects();
  const posts = blog.getAllPosts();
  const featured = posts.find((post) => post.coverImage);

  return (
    <main>
      <section
        className="relative min-h-[420px] overflow-hidden bg-zinc-900"
        style={
          featured?.coverImage
            ? { backgroundImage: `url(${featured.coverImage})` }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/70 to-zinc-950/20" />
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl flex-col justify-end px-5 py-12 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Dowen&apos;s World
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl">
            技術筆記、遊戲開發、桌面工具與重新開始的部落格。
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-200">
            舊 Hexo 文章已保留原網址與顯示能力；新站也整理了 side project 的固定驗證路徑。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/archives/"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
            >
              Browse posts
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              <FolderKanban size={16} />
              Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
              Latest Posts
            </h2>
            <Link
              href="/atom.xml"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-emerald-700"
            >
              <Rss size={16} />
              Atom
            </Link>
          </div>
          <PostList posts={posts.slice(0, 10)} />
        </div>

        <aside className="lg:border-l lg:border-zinc-200 lg:pl-8">
          <h2 className="text-xl font-semibold tracking-normal text-zinc-950">
            Side Projects
          </h2>
          <div className="mt-2">
            {projects.map((project) => (
              <ProjectSummary key={project.slug} project={project} />
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
