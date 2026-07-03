import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
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
      eyebrow="Project"
      title={project.name}
      description={project.tagline}
    >
      <section className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div>
          <p className="text-base leading-7 text-zinc-700">{project.summary}</p>
          <h2 className="mt-8 text-xl font-semibold text-zinc-950">Highlights</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-6 text-zinc-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <aside className="border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-medium text-zinc-950">Status</dt>
              <dd className="mt-1 text-zinc-600">{project.status}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-950">Google verification URL</dt>
              <dd className="mt-1 break-all text-zinc-600">{project.verificationPath}</dd>
            </div>
            <div>
              <dt className="font-medium text-zinc-950">Last updated</dt>
              <dd className="mt-1 text-zinc-600">{project.updatedAt}</dd>
            </div>
          </dl>
          <Link
            href={project.privacyPath}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            <ShieldCheck size={16} />
            Privacy Policy
          </Link>
        </aside>
      </section>
    </PageShell>
  );
}
