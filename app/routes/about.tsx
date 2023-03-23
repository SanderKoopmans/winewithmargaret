import { useLoaderData } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";
import { Blocks } from "~/components/blocks/Blocks";

export async function loader() {
  checkEnvVars();

  const response = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/blogs/3?populate=*`,
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
  console.log("🚀 ~ file: about.tsx:22 ~ loader ~ data:", data);

  if (data.error) {
    throw new Response("Error loading data from strapi", { status: 500 });
  }

  return data.data;
}

export default function Index() {
  const about = useLoaderData();

  return (
    <>
      <p>About page</p>
      <Blocks />
    </>
    // <div
    //   className="mb-16 hidden first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:text-[#60435F] md:block"
    //   dangerouslySetInnerHTML={{ __html: parseContent(about) }}
    // />
  );
}
