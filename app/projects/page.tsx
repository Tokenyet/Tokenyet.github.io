import type { Metadata } from "next";
import { ProjectSummary } from "@/features/projects/framework/ProjectSummary";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";
import { PageShell } from "@/shared/framework/PageShell";

export const metadata: Metadata = {
  title: "作品集",
  description: "Dowen 的工程作品集、產品型個人專案與舊實驗。",
  alternates: {
    canonical: "/projects/",
  },
};

export default function ProjectsPage() {
  const projects = new GetProjectsUseCase().getProjects();

  return (
    <PageShell
      eyebrow="作品"
      title="工程作品集"
      description="整理正在維護、準備發布或曾經實驗過的工程作品。重點不是只列名稱，而是呈現問題、取捨、技術棧與實際驗證方式。"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectSummary key={project.slug} project={project} />
        ))}
      </div>
    </PageShell>
  );
}
