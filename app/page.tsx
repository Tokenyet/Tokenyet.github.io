/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FileText,
  FolderKanban,
  Rss,
  ShieldCheck,
} from "lucide-react";
import type { Post } from "@/features/blog/entity/types";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import type { Project } from "@/features/projects/entity/types";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";
import { formatDate } from "@/shared/utils/date";

export default function HomePage() {
  const blog = new GetBlogDataUseCase();
  const projects = new GetProjectsUseCase().getProjects();
  const posts = blog.getAllPosts();
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              專案
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
              想法成真，撫平痛點。
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600">
              這裡整理我做過的個人專案、桌面工具、瀏覽器擴充套件、
              即時互動實驗，以及偶爾寫下來的技術筆記。
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects/"
                className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                <FolderKanban size={16} />
                看專案
              </Link>
              <Link
                href="/archives/"
                className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
              >
                <FileText size={16} />
                看文章
              </Link>
            </div>
          </div>

          <dl className="grid gap-4 border-t border-zinc-200 pt-6 sm:grid-cols-3 lg:block lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <HomeMetric label="方向" value="桌面與網頁" />
            <HomeMetric label="偏好" value="本機優先" />
            <HomeMetric label="範圍" value="工具 / 遊戲 / App" />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              精選專案
            </h2>
          </div>
          <Link
            href="/projects/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-emerald-700"
          >
            全部專案
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectShowcaseCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  技術筆記
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950">
                  最近文章
                </h2>
              </div>
              <Link
                href="/atom.xml"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-emerald-700"
              >
                <Rss size={16} />
                Atom
              </Link>
            </div>
            <WritingPreview posts={posts.slice(0, 5)} />
          </div>

          <aside className="border-t border-zinc-200 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <Code2 className="text-emerald-700" size={24} aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold tracking-normal text-zinc-950">
              這個網站現在的方向
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              專案是第一層，文章是第二層證據。舊部落格內容仍保留，
              但首頁會優先呈現可被快速理解的工程成果與專案脈絡。
            </p>
            <Link
              href="/about/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-zinc-800 hover:text-emerald-700"
            >
              關於 Dowen
              <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

function HomeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="lg:border-b lg:border-zinc-200 lg:py-4 lg:first:pt-0 lg:last:border-b-0 lg:last:pb-0">
      <dt className="text-sm font-medium text-zinc-500">{label}</dt>
      <dd className="mt-1 text-base font-semibold text-zinc-950">{value}</dd>
    </div>
  );
}

function ProjectShowcaseCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      <ProjectPreview project={project} />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          <span>{project.kind}</span>
          <span aria-hidden="true">/</span>
          <span>{project.year}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold tracking-normal text-zinc-950">
          <Link href={`/projects/${project.slug}/`} className="hover:text-emerald-700">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{project.summary}</p>
        <p className="mt-4 border-l-2 border-emerald-500 pl-3 text-sm leading-6 text-zinc-700">
          {project.impact}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.slug}/`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-emerald-700"
          >
            專案細節
            <ArrowRight size={16} />
          </Link>
          {project.privacyPath ? (
            <Link
              href={project.privacyPath}
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900"
            >
              <ShieldCheck size={15} />
              隱私
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Link
        href={`/projects/${project.slug}/`}
        className="block border-b border-zinc-200 bg-zinc-100"
        aria-label={project.name}
      >
        <img
          src={project.image.src}
          alt={project.image.alt}
          className="aspect-[16/9] h-full w-full object-cover"
          loading="lazy"
        />
      </Link>
    );
  }

  return (
    <div className="border-b border-zinc-800 bg-zinc-950 p-5 text-white">
      <div className="flex items-center justify-between gap-4 text-sm text-zinc-400">
        <span>{project.status}</span>
        <span>{project.year}</span>
      </div>
      <div className="mt-8 font-mono text-sm leading-6 text-zinc-300">
        <p>
          <span className="text-emerald-300">專案</span>/{project.slug}
        </p>
        <p>
          <span className="text-sky-300">角色</span> {project.role}
        </p>
      </div>
    </div>
  );
}

function WritingPreview({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-zinc-600">目前沒有文章。</p>;
  }

  return (
    <div className="divide-y divide-zinc-200 border-y border-zinc-200">
      {posts.map((post) => (
        <Link
          key={post.routePath}
          href={post.routePath}
          className="grid gap-2 py-4 text-sm hover:bg-zinc-50 sm:grid-cols-[120px_1fr]"
        >
          <time className="text-zinc-500" dateTime={post.date.toISOString()}>
            {formatDate(post.date)}
          </time>
          <span>
            <span className="font-semibold text-zinc-950">{post.title}</span>
            <span className="mt-1 line-clamp-1 block text-zinc-600">
              {post.description}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
