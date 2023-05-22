import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import qs from "qs";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { Blocks } from "~/components/blocks/Blocks";

const query = qs.stringify({
  populate: ["deep"],
});

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/margaret?${query}`, {
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

export default function Margaret() {
  const margaret = useLoaderData();

  return (
    <>
      <Blocks blocks={margaret?.attributes?.content} />
    </>
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
