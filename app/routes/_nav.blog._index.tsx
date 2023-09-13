import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/utils/post";

export async function loader() {
  return await getPosts();
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  console.log(posts);
  return (
    <div>
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
