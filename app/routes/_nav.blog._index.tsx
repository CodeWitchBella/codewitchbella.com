import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/utils/post";

export async function loader() {
  return json(await getPosts(), {
    headers: { "Cache-Control": "public, s-maxage=3600" },
  });
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  console.log(posts);
  return (
    <div className="prose mx-auto">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
