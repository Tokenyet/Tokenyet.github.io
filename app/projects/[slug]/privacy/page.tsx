import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const dynamicParams = false;

export function generateStaticParams() {
  return new GetProjectsUseCase()
    .getProjects()
    .filter((project) => project.privacyPath)
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
    title: project ? `${project.name} 隱私政策` : "隱私政策",
    description: project
      ? `${project.name} 的隱私政策。`
      : "隱私政策。",
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

  if (!project || !project.privacyPath || !project.dataUse) {
    notFound();
  }

  return (
    <PageShell
      eyebrow="隱私"
      title={`${project.name} 隱私政策`}
      description={`最後更新：${project.updatedAt}`}
    >
      <article className="max-w-[var(--article-width)] space-y-8">
        <p className="text-base leading-7 text-zinc-700">
          {project.name} 是以 Gmail 工作流程為核心的 Windows 桌面郵件工具。
          本政策說明 {project.name} 會存取哪些資料、如何使用資料，以及資料儲存位置。
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
