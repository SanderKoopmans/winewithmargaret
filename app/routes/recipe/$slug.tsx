// @ts-nocheck
import { useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs, LinksFunction } from '@remix-run/node'
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { parseContent } from "~/utils";
import qs from 'qs';

import recipeStyles from '../../styles/recipe.css';
import { Clock, Users } from "lucide-react";
import { H2, H3, Paragraph } from "~/components/typography/Typography";

const query = qs.stringify(
    {
        populate: {
            category: { populate: ['name']},
            hero: { fields: ['url']},
        },
    },
)

export async function loader({ params }: DataFunctionArgs) {
    if (!params.slug) {
        throw new Error('params.slug is not defined')
      }
    checkEnvVars();
  
    const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/articles/find-by-slug/${params.slug}?${query}`,{
        method:"GET",
        headers:{
          "Authorization":`Bearer ${process.env.STRAPI_API_TOKEN}`,
          "Content-Type":"application/json"
        }
      });
  
      checkStatus(response);
  
      const data = await response.json();
  
      if (data.error) {
        throw new Response("Error loading data from strapi", { status: 500});
      }
  
      return data.data;
  }

  export const links: LinksFunction = () => {
    return [
      {
        rel: 'stylesheet',
        href: recipeStyles,
      },
    ];
  };

export default function Recipe() {
    const recipe = useLoaderData();
    console.log("🚀 ~ file: $slug.tsx:55 ~ Recipe ~ recipe:", recipe)

    const [{ attributes: { title, content, summary, ingredients, time, servings, tools, hero: {
        data: { attributes: { url }}
      }, }}] = recipe;

    return (
    <div className="wrapper pt-8 flex flex-col gap-6">
        <div className="w-full h-[700px] mt-[120px] relative">
            <div className="h-full w-7/12 bg-red-100">
              <div className="h-full w-[40%] left-[24px] absolute flex flex-col gap-4 justify-center">
                <Paragraph className="pl-1">Category</Paragraph>
                <H2>
                  {title}
                </H2>
                <div className="flex mt-16">
                  <div className="flex flex-col gap-2 justify-center items-start border-r border-r-black py-2 px-4">
                    <Paragraph className="">Serves:</Paragraph>
                    <span className="flex gap-4">
                      <Users />
                      {servings}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 justify-center items-start py-2 px-4">
                    <Paragraph className="">Time:</Paragraph>
                    <span className="flex gap-4">
                      <Clock />
                      {time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full absolute top-[-120px] right-0">
                <img src={`${process.env.STRAPI_URL_BASE}${url}`} alt={title} className="w-full h-3/4"/>
            </div>
        </div>
      <div className="flex gap-6 p-6">
        <div className="recipe-side w-1/3">
          <H3 className="mb-4">Tools:</H3>
          <div className="mb-4 capitalize" dangerouslySetInnerHTML={{ __html: parseContent(tools) }} />
          <H3 className="mb-4">Ingredients:</H3>
          <div className="mb-4 capitalize" dangerouslySetInnerHTML={{ __html: parseContent(ingredients) }} />
        </div>
        <div className="recipe-details w-2/3">
          <div className="mb-4" dangerouslySetInnerHTML={{ __html: parseContent(summary)}} />
          <H3 className="mb-4">Method:</H3>
          <div dangerouslySetInnerHTML={{ __html: parseContent(content)}} />
        </div>
      </div>
    </div>
    )
} 
 