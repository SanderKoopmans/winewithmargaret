// @ts-nocheck
import { useLoaderData, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import qs from "qs";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

import articleStyles from "../../styles/article.css";
import { Blocks } from "~/components/blocks/Blocks";

const query = qs.stringify({
  populate: {
    content: { populate: ["content", "content.image"] },
    categories: { populate: ["category"] },
    thumbnail: { fields: ["url"] },
    pageType: { fields: ["pageType"] },
  },
}); 

export async function loader({ params }: DataFunctionArgs) {
  if (!params.slug) {
    throw new Error("params.slug is not defined");
  }
  checkEnvVars();

  const response = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/posts/find-by-slug/${params.slug}?populate=deep`,
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

  const
    {
      attributes: { content },
    }
  = post;

  return (
    <div>
      {content && <Blocks blocks={content} />}
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
