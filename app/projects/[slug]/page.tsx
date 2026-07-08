/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return new GetProjectsUseCase()
    .getProjects()
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = new GetProjectsUseCase().getProjectBySlug(slug);

  return {
    title: project?.name ?? "Project",
    description: project?.summary,
    alternates: {
      canonical: `/projects/${slug}/`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = new GetProjectsUseCase().getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={project.kind}
      title={project.name}
      description={project.tagline}
    >
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {project.image ? (
            <figure className="mb-8 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
              <img
                src={project.image.src}
                alt={project.image.alt}
                className="aspect-[16/9] h-full w-full object-cover"
              />
            </figure>
          ) : null}

          <p className="text-base leading-7 text-zinc-700">{project.summary}</p>
          <p className="mt-5 border-l-2 border-emerald-500 pl-4 text-base leading-7 text-zinc-800">
            {project.impact}
          </p>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
              專案脈絡
            </h2>
            <div className="mt-5 grid gap-4">
              {project.caseStudy.map((section) => (
                <article
                  key={section.title}
                  className="rounded-md border border-zinc-200 bg-white p-5"
                >
                  <h3 className="text-base font-semibold text-zinc-950">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold tracking-normal text-zinc-950">
              工程重點
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-6 text-zinc-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <dl className="space-y-5 text-sm">
            <ProjectFact label="狀態" value={project.status} />
            <ProjectFact label="年份" value={project.year} />
            <ProjectFact label="負責範圍" value={project.role} />
            <ProjectFact label="最後更新" value={project.updatedAt} />
            {project.verificationPath ? (
              <ProjectFact
                label="驗證網址"
                value={project.verificationPath}
                breakValue
              />
            ) : null}
          </dl>

          <div className="mt-7">
            <h2 className="text-sm font-semibold text-zinc-950">技術棧</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-2">
            {project.privacyPath ? (
              <Link
                href={project.privacyPath}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                <ShieldCheck size={16} />
                隱私政策
              </Link>
            ) : null}
            {project.links?.map((link) => (
              <SmartLink
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
              >
                <ExternalLink size={16} />
                {link.label}
              </SmartLink>
            ))}
            <Link
              href="/projects/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
            >
              全部作品
              <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function ProjectFact({
  label,
  value,
  breakValue,
}: {
  label: string;
  value: string;
  breakValue?: boolean;
}) {
  return (
    <div>
      <dt className="font-medium text-zinc-950">{label}</dt>
      <dd className={`mt-1 text-zinc-600 ${breakValue ? "break-all" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={className} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
