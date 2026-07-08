/**
 * Intent: Provide project queries without exposing repository storage.
 * Constraints: Framework routes should not import static data directly.
 * Acceptance: Project index and detail pages share one typed usecase.
 */

import {
  getProjectBySlug,
  getProjects,
} from "@/features/projects/adapter/projectRepository";

export class GetProjectsUseCase {
  getProjects() {
    return getProjects()
      .slice()
      .sort((a, b) => getShowcasePriority(b) - getShowcasePriority(a));
  }

  getProjectBySlug(slug: string) {
    return getProjectBySlug(slug);
  }
}

function getShowcasePriority(project: ReturnType<typeof getProjects>[number]) {
  if (
    project.kind === "瀏覽器擴充套件" &&
    project.status.includes("Chrome Web Store")
  ) {
    return 3;
  }

  if (project.status.includes("公開 GitHub release")) {
    return 2;
  }

  if (project.status.includes("本機 sideload")) {
    return 1;
  }

  return 0;
}
