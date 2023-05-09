import { Outlet, useLoaderData } from "@remix-run/react";
import qs from "qs";
import { AuthorCard } from "~/components/authorCard/AuthorCard";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";

const query = qs.stringify({
  populate: ["picture"],
});

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/authors?${query}`, {
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

export default function WomanInWine() {
  const authors = useLoaderData();

  return (
    <>
      <Outlet />
      <div>Woman in Wine placholder -- authors page</div>
      {authors.map((author, i) => <AuthorCard author={author} key={`${i}+${author.slug}`} />)}
    </>
  );
}
