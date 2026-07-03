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
    return getProjects();
  }

  getProjectBySlug(slug: string) {
    return getProjectBySlug(slug);
  }
}
