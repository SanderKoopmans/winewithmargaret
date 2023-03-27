import { useLoaderData } from "@remix-run/react";
import qs from "qs";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";
import { Blocks } from "~/components/blocks/Blocks";
import { variables } from "~/config/variables";

const query = qs.stringify({
  populate: ["content", "content.image"],
});

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${variables.API_URL}/api/about?${query}`, {
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
  const about = useLoaderData();
  console.log("🚀 ~ file: about.tsx:44 ~ Index ~ about:", about);

  return (
    <>
      <Blocks blocks={about?.attributes?.content} />
    </>
  );
}
