import type { Metadata } from "next";
import { ProjectSummary } from "@/features/projects/framework/ProjectSummary";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "Projects",
  alternates: {
    canonical: "/projects/",
  },
};

export default function ProjectsPage() {
  const projects = new GetProjectsUseCase().getProjects();

  return (
    <PageShell
      eyebrow="Projects"
      title="Side Projects"
      description="整理正在維護、準備發布或曾經實驗過的工具與作品。"
    >
      <div className="divide-y divide-zinc-200 border-y border-zinc-200">
        {projects.map((project) => (
          <ProjectSummary key={project.slug} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
