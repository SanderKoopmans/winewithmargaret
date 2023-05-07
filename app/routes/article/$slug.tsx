// @ts-nocheck
import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import qs from "qs";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";

import articleStyles from "../../styles/article.css";

const query = qs.stringify({
  populate: {
    categories: { populate: ["category"] },
    Thumbnail: { fields: ["url"] },
    PageType: { fields: ["PageType"] },
  },
});

export async function loader({ params }: DataFunctionArgs) {
  console.log("🚀 ~ file: $slug.tsx:10 ~ loader ~ params:", params)
  if (!params.slug) {
    throw new Error("params.slug is not defined");
  }
  checkEnvVars();

  const response = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/posts/find-by-slug/${params.slug}?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  checkStatus(response);

  const data = await response.json();
  console.log("🚀 ~ file: $slug.tsx:39 ~ loader ~ data:", data)

  if (data.error) {
    throw new Response("Error loading data from strapi", { status: 500 });
  }

  return data.post;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: articleStyles,
    },
  ];
};

export default function Article() {
  const post = useLoaderData();
  console.log("🚀 ~ file: $slug.tsx:49 ~ Article ~ article:", post)

  const
    {
      attributes: { Title, content },
    }
  = post;

  return (
    <div>
      <h1>{Title}</h1>
      {post?.content && <div dangerouslySetInnerHTML={{ __html: parseContent(content) }} />}
    </div>
  );
}
