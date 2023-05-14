import { useLoaderData } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import qs from "qs";
import { ClientOnly } from "~/components/client-only/ClientOnly";
import { ArticleGrid } from "~/components/articleGrid/ArticleGrid";

const query = qs.stringify({
  populate: {
    categories: { populate: ["category"] },
    thumbnail: { fields: ["url"] },
    pageType: { fields: ["pageType"] },
  },
});

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/posts?populate=deep`, {
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

export default function Article() {
  const posts = useLoaderData();

  return (
    <>
      <ClientOnly fallback={<h1 className="h-[600px]">Loading</h1>}>
        {() => <ArticleGrid articles={posts} />}
      </ClientOnly>
    </>
  );
}
