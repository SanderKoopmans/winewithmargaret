import { useLoaderData } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import qs from "qs";
import { ClientOnly } from "~/components/client-only/ClientOnly";
import { ArticleGrid } from "~/components/articleGrid/ArticleGrid";

const query = qs.stringify({
  populate: {
    category: { populate: ["name"] },
    thumbnail: { fields: ["url"] },
  },
});

export async function loader() {
  checkEnvVars();

  const response = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/articles?${query}`,
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

export default function Index() {
  const articles = useLoaderData();

  return (
    <ClientOnly fallback={<h1 className="h-[600px]">Loading</h1>}>
      {() => <ArticleGrid articles={articles} />}
    </ClientOnly>
  );
}
