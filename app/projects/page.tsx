import type { Metadata } from "next";
import { ProjectSummary } from "@/features/projects/framework/ProjectSummary";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "專案",
  description: "Dowen 的個人專案、工具與實驗。",
  alternates: {
    canonical: "/projects/",
  },
};

export default function ProjectsPage() {
  const projects = new GetProjectsUseCase().getProjects();

  return (
    <PageShell
      title="專案"
      description="整理正在維護、準備發布或曾經實驗過的個人專案。重點不是只列名稱，而是呈現問題、取捨、技術棧與實際驗證方式。"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectSummary key={project.slug} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
