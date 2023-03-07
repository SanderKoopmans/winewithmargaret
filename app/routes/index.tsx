import { useLoaderData } from "@remix-run/react";
import { checkEnvVars, checkStatus } from "~/utils/errorHandling";
import { useEffect } from "react";
import { Articles } from "~/components/articles/Articles";
import qs from 'qs';

const query = qs.stringify(
  {
    populate: {
      category: { populate: ['name']},
      thumbnail: { fields: ['url']},
    },
  },
)

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/articles?${query}`,{
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

export default function Index() {
  const articles = useLoaderData();
  console.log("🚀 ~ file: index.tsx:40 ~ Index ~ articles:", articles[0].attributes.thumbnail.data.attributes.url)
  // console.log("🚀 ~ file: index.tsx:30 ~ Index ~ articles:", articles[0].attributes.thumbnail.data[0].attributes)
  // console.log(''.padEnd(80, '*'))
  // console.log("🚀 ~ file: index.tsx:30 ~ Index ~ articles:", articles[0].attributes.thumbnail.data[0])

  useEffect(() => {
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    function resize() {
      const grid = document.querySelector("#masonry") as HTMLElement;
      const rowHeight = getStyleValue(grid, "grid-auto-rows");
      const rowGap = getStyleValue(grid, "grid-row-gap");

      if (grid) {
        grid.style.gridAutoRows = "auto";
        grid.style.alignItems = "self-start";
        grid.querySelectorAll(".item").forEach((item) => {
          (item as HTMLElement).style.gridRowEnd = `span ${Math.ceil(
            (item.clientHeight + rowGap) / (rowHeight + rowGap)
          )}`;
        });
        grid.removeAttribute("style");
      }
    }

    function getStyleValue(element: HTMLElement, style: string): number {
      return parseInt(window.getComputedStyle(element).getPropertyValue(style));
    }
  }, []);

  return (
        <div id="masonry" className="wrapper grid gap-2.5 grid-cols-masonry auto-rows-[20px] max-w-[1280px] w-full h-full">
          <Articles articles={articles} />
        </div>
  );
}
