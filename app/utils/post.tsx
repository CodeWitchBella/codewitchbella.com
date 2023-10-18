import parseFrontMatter from "front-matter";
import path from "path";
import { bundleMDX, gfmFootnote, readFile, readdir, gfmFootnoteFromMarkdown, gfmFootnoteToMarkdown } from "./server-only.server.js";
import { notNull } from "@isbl/ts-utils";


function blogsPath() {
  return __dirname + "/../blog";
}

export async function getPost(slug: string) {
  // Inspiration: https://blog.oldweb2.com/remix-mdx-blog
  let source;
  try {
    source = await readFile(path.join(blogsPath(), slug + ".mdx"), "utf-8");
  } catch (e) {
    throw new Response("Not found", { status: 404 });
  }

  const rehypeHighlight = (await import("rehype-highlight")).default;

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe",
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild",
    );
  }
  const post = await bundleMDX({
    source,
    globals: { '@remix-run/react': { varName: 'remix', namedExports: ['Outlet'] } },
    mdxOptions(options, frontmatter) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // full gfm is broken, this at least gives me footnotes
        function(this: any) {
          const data = this.data()
          const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = [])
          const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
          const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = [])
          micromarkExtensions.push(gfmFootnote())
          fromMarkdownExtensions.push(gfmFootnoteFromMarkdown())
          toMarkdownExtensions.push(gfmFootnoteToMarkdown())
        },
        rehypeHighlight,
      ].filter(notNull);

      return options;
    },
  });

  return post;
}

export async function getPosts() {
  // Inspiration: https://blog.oldweb2.com/remix-mdx-blog
  const root = blogsPath();
  const postsPath = await readdir(root, { withFileTypes: true });

  const posts = await Promise.all(
    postsPath.map(async (dirent) => {
      const file = await readFile(path.join(root, dirent.name));
      const fm = parseFrontMatter(file.toString());
      const attributes: any = fm.attributes;
      if (typeof attributes !== "object" || !attributes) return null;
      return {
        slug: dirent.name.replace(/\.mdx/, ""),
        title: attributes.title,
        publishedAt: attributes.published_at,
      };
    }),
  );
  return posts.filter(notNull);
}
