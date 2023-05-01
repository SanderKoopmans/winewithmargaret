import { useLoaderData } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import qs from "qs";
import { ClientOnly } from "~/components/client-only/ClientOnly";
import { ArticleGrid } from "~/components/articleGrid/ArticleGrid";
import { variables } from "~/config/variables";

const query = qs.stringify({
  populate: {
    category: { populate: ["name"] },
    thumbnail: { fields: ["url"] },
  },
});

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${variables.API_URL}/api/posts?${query}`, {
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
  console.log('posts; ', posts);
  console.log(''.padEnd(80, '*'));

  return (
    <ClientOnly fallback={<h1 className="h-[600px]">Loading</h1>}>
    {/* <ClientOnly fallback={null}> */}
      {() => <ArticleGrid articles={posts} />}
    </ClientOnly>
  );
}
