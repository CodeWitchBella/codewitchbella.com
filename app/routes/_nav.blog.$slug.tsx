import { json } from "@remix-run/node";
import type { LinksFunction, DataFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { getPost } from "~/utils/post";
import style from "../utils/post.css";
import { __DEV__ } from "~/utils/utils";
import { prose } from "~/components/css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: style,
    },
  ];
};

type LoaderData = {
  frontmatter: any;
  code: string;
};

export async function loader({ params, request }: DataFunctionArgs) {
  const slug = params.slug;
  if (!slug) throw new Response("Not found", { status: 404 });

  const post = await getPost(slug);
  if (post && (post.frontmatter.published_at || __DEV__)) {
    const { frontmatter, code } = post;
    return json(
      { frontmatter, code },
      {
        headers: { "Cache-Control": "public, s-maxage=3600" },
      },
    );
  } else {
    throw new Response("Not found", { status: 404 });
  }
}

export default function Post() {
  const { code, frontmatter } = useLoaderData<LoaderData>();
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <article className={prose+" mx-auto mb-8"}>
      <Link to="/blog">&larr; Back to blog index</Link>
      <h1>{frontmatter.title}</h1>
      {frontmatter.published_at ? (
        <div className="-mt-4 font-light text-slate-900">
          Published: {frontmatter.published_at.split("T")[0]}
        </div>
      ) : null}
      <Component />
    </article>
  );
}
