import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { ClientOnly } from "~/components/client-only/ClientOnly";
import { ArticleGrid } from "~/components/articleGrid/ArticleGrid";

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts?populate=deep&sort=createdAt:desc`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  checkStatus(response);

  const data = await response.json();

  if (data.error) {
    throw new Response("Error loading data from strapi", { status: 500 });
  }

  return data.data;
}

export default function Index() {
  const posts = useLoaderData();

  return (
    <ClientOnly fallback={<h1 className="h-[600px]">Loading</h1>}>
      {() => <ArticleGrid articles={posts} />}
    </ClientOnly>
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
