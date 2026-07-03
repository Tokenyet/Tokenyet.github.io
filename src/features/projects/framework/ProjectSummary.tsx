import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import type { Project } from "@/features/projects/entity/types";

interface ProjectSummaryProps {
  project: Project;
}

export function ProjectSummary({ project }: ProjectSummaryProps) {
  return (
    <section className="border-b border-zinc-200 py-7 last:border-b-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-emerald-700">{project.status}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-normal text-zinc-950">
            {project.name}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            {project.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/projects/${project.slug}/`}
            className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            <ExternalLink size={16} />
            Project
          </Link>
          <Link
            href={project.privacyPath}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            <ShieldCheck size={16} />
            Privacy
          </Link>
        </div>
      </div>
    </section>
  );
}
