/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import type { Project } from "@/features/projects/entity/types";

interface ProjectSummaryProps {
  project: Project;
}

export function ProjectSummary({ project }: ProjectSummaryProps) {
  return (
    <article className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      <ProjectMedia project={project} />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
          <span>{project.kind}</span>
          <span aria-hidden="true">/</span>
          <span>{project.year}</span>
          <span aria-hidden="true">/</span>
          <span>{project.status}</span>
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-normal text-zinc-950">
          <Link href={`/projects/${project.slug}/`} className="hover:text-emerald-700">
            {project.name}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">{project.summary}</p>
        <p className="mt-4 border-l-2 border-emerald-500 pl-3 text-sm leading-6 text-zinc-700">
          {project.impact}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
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
            className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            專案細節
            <ArrowRight size={16} />
          </Link>
          {project.privacyPath ? (
            <Link
              href={project.privacyPath}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
            >
              <ShieldCheck size={16} />
              隱私
            </Link>
          ) : null}
          {project.links?.slice(0, 1).map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
            >
              <ExternalLink size={16} />
              {link.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectMedia({ project }: { project: Project }) {
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
