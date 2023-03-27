// @ts-nocheck
import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";

import articleStyles from "../../styles/article.css";
import { variables } from "~/config/variables";

export async function loader({ params }: DataFunctionArgs) {
  if (!params.slug) {
    throw new Error("params.slug is not defined");
  }
  checkEnvVars();

  const response = await fetch(
    `${variables.API_URL}/api/articles/find-by-slug/${params.slug}?populate=category`,
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

  if (data.error) {
    throw new Response("Error loading data from strapi", { status: 500 });
  }

  return data.data;
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
  const article = useLoaderData();

  const [
    {
      attributes: { title, content },
    },
  ] = article;

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: parseContent(content) }} />
    </div>
  );
}
