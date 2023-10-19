import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prose } from "~/components/css";

import { getPosts } from "~/utils/post";
import { __DEV__ } from "~/utils/utils";

export async function loader() {
  let posts = await getPosts();
  if (!__DEV__) posts = posts.filter((post) => post.publishedAt);
  posts = posts.sort((a, b) =>
    !a.publishedAt || !b.publishedAt
      ? a.publishedAt
        ? 1
        : b.publishedAt
        ? -1
        : 0
      : b.publishedAt?.localeCompare(a.publishedAt),
  );
  return json(posts, {
    headers: { "Cache-Control": "public, s-maxage=3600" },
  });
}

export default function Posts() {
  const posts = useLoaderData<typeof loader>();
  if (!posts.length) {
    return <div className={prose + " mx-auto"}>Nothing to see here, yet.</div>;
  }
  return (
    <>
      <div className={prose + " mx-auto grow"}>
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={post.slug}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky flex justify-center mt-8" style={{ top: "100vh" }}>
        <a
          href="https://www.instagram.com/blahajcz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/static/shark.webp"
            aria-label="me holding a Blåhaj (one meter long plush shark from IKEA) in front of Antwerpen cathedral."
            style={{ width: 549 / 2, height: 1260 / 2 }}
          />
        </a>
      </div>
    </>
  );
}
