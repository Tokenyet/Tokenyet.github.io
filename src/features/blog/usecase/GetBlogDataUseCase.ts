/**
 * Intent: Provide application-facing blog queries without exposing repository details.
 * Constraints: Usecase layer stays framework-agnostic and delegates persistence to adapter functions.
 * Acceptance: App routes consume posts, archive groups, and taxonomy through this stable surface.
 */

import {
  getAllPosts,
  getCategories,
  getPostByRoute,
  getPostsByCategory,
  getPostsByTag,
  getPostsByYear,
  getTags,
  getTaxonomyLabel,
} from "@/features/blog/adapter/postRepository";

export class GetBlogDataUseCase {
  getAllPosts() {
    return getAllPosts();
  }

  getPostByRoute(params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  }) {
    return getPostByRoute(params);
  }

  getPostsByYear() {
    return getPostsByYear();
  }

  getCategories() {
    return getCategories();
  }

  getTags() {
    return getTags();
  }

  getPostsByCategory(slug: string) {
    return getPostsByCategory(slug);
  }

  getPostsByTag(slug: string) {
    return getPostsByTag(slug);
  }

  getTaxonomyLabel(kind: "category" | "tag", slug: string) {
    return getTaxonomyLabel(kind, slug);
  }
}
