import path from "node:path";
import { GenerateStaticFilesUseCase } from "@/features/blog/usecase/GenerateStaticFilesUseCase";
import { GetBlogDataUseCase } from "@/features/blog/usecase/GetBlogDataUseCase";
import { GetProjectsUseCase } from "@/features/projects/usecase/GetProjectsUseCase";

new GenerateStaticFilesUseCase().execute({
  posts: new GetBlogDataUseCase().getAllPosts(),
  projects: new GetProjectsUseCase().getProjects(),
  outputDir: path.join(process.cwd(), "public"),
});

console.log("Generated public/atom.xml, public/sitemap.xml, and public/robots.txt.");
