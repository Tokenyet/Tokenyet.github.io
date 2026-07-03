/**
 * Intent: Render legacy Hexo Markdown with modern Markdown-it while preserving raw HTML.
 * Constraints: Static build only; content is trusted first-party legacy content.
 * Acceptance: Math, images, headings, code blocks, and external links render consistently.
 */

import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItKatex from "markdown-it-katex";
import { headingSlug } from "@/features/blog/adapter/slug";
import { transformHexoMarkdown } from "@/features/blog/adapter/hexoCompatibility";

const markdown = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: false,
  highlight(code, language) {
    const lang = language && hljs.getLanguage(language) ? language : "plaintext";
    const highlighted = hljs.highlight(code, { language: lang }).value;
    return `<pre class="code-block"><code class="hljs language-${lang}">${highlighted}</code></pre>`;
  },
})
  .use(markdownItKatex)
  .use(markdownItAnchor, {
    slugify: headingSlug,
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: "#",
      placement: "before",
      class: "heading-anchor",
      ariaHidden: true,
    }),
  });

const defaultLinkOpen =
  markdown.renderer.rules.link_open ??
  ((tokens, index, options, _env, self) => self.renderToken(tokens, index, options));

markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
  const token = tokens[index];
  const href = token?.attrGet("href") ?? "";

  if (/^https?:\/\//i.test(href)) {
    token?.attrSet("target", "_blank");
    token?.attrSet("rel", "noopener noreferrer");
  }

  return defaultLinkOpen(tokens, index, options, env, self);
};

export function renderMarkdown(markdownSource: string): string {
  return markdown.render(transformHexoMarkdown(markdownSource));
}
