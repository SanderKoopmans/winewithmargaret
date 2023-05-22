import { Outlet, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import qs from "qs";
import { AuthorIntro } from "~/components/AuthorIntro";
import { AuthorCard } from "~/components/authorCard/AuthorCard";
import { getAuthorIntro, getAuthors } from "~/utils/author.server";

const query = qs.stringify({
  populate: ["picture"],
});

export async function loader() {
  const [authorIntro, authors] = await Promise.all([
    getAuthorIntro(),
    getAuthors(query),
  ]);

  return {
    authors,
    authorIntro,
  }
}

export default function WomenInWine() {
  const { authors, authorIntro } = useLoaderData();

  return (
    <>
      <Outlet />
      <AuthorIntro intro={authorIntro} />
      <section className="flex gap-8 mx-auto">
        {authors.map((author, i) => <AuthorCard author={author} key={`${i}+${author.slug}`} />)}
      </section>
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
