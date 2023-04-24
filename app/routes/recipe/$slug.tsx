// @ts-nocheck
import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from "@remix-run/node";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";
import qs from "qs";

import recipeStyles from "../../styles/recipe.css";
import { Clock, Users } from "lucide-react";
import { H2, H3, Paragraph } from "~/components/typography/Typography";
import { variables } from "~/config/variables";

const query = qs.stringify({
  populate: {
    category: { populate: ["name"] },
    hero: { fields: ["url"] },
  },
});

export async function loader({ params }: DataFunctionArgs) {
  if (!params.slug) {
    throw new Error("params.slug is not defined");
  }
  checkEnvVars();

  const response = await fetch(
    `${variables.API_URL}/api/posts/find-by-slug/${params.slug}?${query}`,
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

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: recipeStyles,
    },
  ];
};

export default function Recipe() {
  const recipe = useLoaderData();

  const [
    {
      attributes: {
        title,
        content,
        summary,
        ingredients,
        time,
        servings,
        tools,
        hero: {
          data: {
            attributes: { url },
          },
        },
      },
    },
  ] = recipe;

  /** Add toggle to leave screen on -- check Web API */

  return (
    <>
      <div className="flex flex-col gap-6 px-4 pt-8 pb-28 md:pb-0">
        <div className="relative w-full md:mt-[120px] md:h-[700px]">
          <div className="bg-red-100 md:h-full md:w-7/12">
            <div className="flex flex-col gap-4 p-6 md:absolute md:left-[24px] md:h-full md:w-[40%] md:justify-center">
              <Paragraph className="pl-1">Category</Paragraph>
              <H2>{title}</H2>
              <div className="mt-16 flex">
                <div className="flex flex-col items-start justify-center gap-2 border-r border-r-black py-2 px-4">
                  <Paragraph className="">Serves:</Paragraph>
                  <span className="flex gap-4">
                    <Users />
                    {servings}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center gap-2 py-2 px-4">
                  <Paragraph className="">Time:</Paragraph>
                  <span className="flex gap-4">
                    <Clock />
                    {time}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-[-60px] mr-[-24px] mb-[36px] ml-auto h-full w-1/2 md:absolute md:right-0 md:top-[-120px] md:mt-0 md:mb-0 md:mr-0">
            <img
              src={`${variables.API_URL}${url}`}
              alt={title}
              className="h-3/4 w-full"
            />
          </div>
        </div>
      </div>
      <div className="content flex flex-col gap-6 p-6 md:flex-row">
        <div
          className="mb-16 first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:text-[#60435F] md:hidden"
          dangerouslySetInnerHTML={{ __html: parseContent(summary) }}
        />
        <div className="recipe-side md:w-1/3">
          <H3 className="mb-8">Tools:</H3>
          <div
            className="mb-16 capitalize"
            dangerouslySetInnerHTML={{ __html: parseContent(tools) }}
          />
          <H3 className="mb-8">Ingredients:</H3>
          <div
            className="mb-4 capitalize"
            dangerouslySetInnerHTML={{ __html: parseContent(ingredients) }}
          />
        </div>
        <div className="recipe-details md:w-2/3">
          <div
            className="mb-16 hidden first-letter:float-left first-letter:text-6xl first-letter:font-bold first-letter:text-[#60435F] md:block"
            dangerouslySetInnerHTML={{ __html: parseContent(summary) }}
          />
          <H3 className="mb-8">Method:</H3>
          <div dangerouslySetInnerHTML={{ __html: parseContent(content) }} />
        </div>
      </div>
    </>
  );
}
