import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: project ? `${project.name} Privacy Policy` : "Privacy Policy",
    description: project
      ? `Privacy policy for ${project.name}.`
      : "Privacy policy.",
    alternates: {
      canonical: `/projects/${slug}/privacy/`,
    },
  };
}

export default async function ProjectPrivacyPage({
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
      eyebrow="Privacy"
      title={`${project.name} Privacy Policy`}
      description={`Last updated: ${project.updatedAt}`}
    >
      <article className="max-w-[var(--article-width)] space-y-8">
        <p className="text-base leading-7 text-zinc-700">
          {project.name} is a Windows desktop mail client focused on Gmail workflows.
          This policy explains what data {project.name} accesses, how that data is used,
          and where it is stored.
        </p>
        {project.dataUse.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-zinc-950">{section.title}</h2>
            <p className="mt-3 text-base leading-7 text-zinc-700">{section.body}</p>
          </section>
        ))}
      </article>
    </PageShell>
  );
}
