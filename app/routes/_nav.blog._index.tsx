import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prose } from "~/components/css";

import { getPosts } from "~/utils/post";
import { __DEV__ } from "~/utils/utils";

export async function loader() {
  let posts = await getPosts();
  if (!__DEV__) posts = posts.filter((post) => post.publishedAt);
  return json(posts, {
    headers: { "Cache-Control": "public, s-maxage=3600" },
  });
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  if (!posts.length) {
    return <div className={prose+" mx-auto"}>Nothing to see here, yet.</div>;
  }
  return (
    <div className={prose+" mx-auto"}>
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
