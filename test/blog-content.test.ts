import { describe, expect, it } from "vitest";
import { getAllPosts } from "@/features/blog/adapter/postRepository";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";

describe("migrated blog content", () => {
  it("loads every published legacy post", () => {
    const posts = getAllPosts();

    expect(posts).toHaveLength(34);
    expect(posts.map((post) => post.routePath)).toContain(
      "/2016/08/11/OpenGL-Beginner-Tutorial-4-Math/",
    );
    expect(posts.map((post) => post.routePath)).toContain(
      "/2017/09/06/Libgdx-AvatarSystem-Easy/",
    );
    expect(posts.map((post) => post.routePath)).toContain(
      "/2017/08/14/Libgdx-RpgLikeGame/",
    );
  });

  it("builds taxonomy from imported front matter", () => {
    const blog = new GetBlogDataUseCase();

    expect(blog.getCategories().some((category) => category.name === "OpenGL")).toBe(
      true,
    );
    expect(blog.getTags().some((tag) => tag.name === "OpenGL")).toBe(true);
  });
});

describe("project content", () => {
  it("exposes MailDesk verification and privacy routes", () => {
    const project = new GetProjectsUseCase().getProjectBySlug("maildesk");

    expect(project?.verificationPath).toBe("/projects/maildesk/");
    expect(project?.privacyPath).toBe("/projects/maildesk/privacy/");
  });
});
