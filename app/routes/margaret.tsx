import { useLoaderData } from "@remix-run/react";
import qs from "qs";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";
import { Blocks } from "~/components/blocks/Blocks";

const query = qs.stringify({
  populate: ["content", "content.image"],
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

export default function Index() {
  const margaret = useLoaderData();

  return (
    <>
      <Blocks blocks={margaret?.attributes?.content} />
    </>
  );
}
