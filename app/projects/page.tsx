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
      description="每個 side project 都有穩定路徑，可以放產品介紹、隱私權政策與第三方平台驗證需要的頁面。"
    >
      <div className="divide-y divide-zinc-200 border-y border-zinc-200">
        {projects.map((project) => (
          <ProjectSummary key={project.slug} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
