import * as React from "react";
import { Articles } from "../articles/Articles";

export const ArticleGrid = ({ articles }: any) => {
  //   const articles = useLoaderData();

  /** This should move to render on client-side, won't recalculate rows */
  React.useEffect(() => {
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

    // setTimeout(() => resize(), 100);

    // Check if the page has already loaded
    if (document.readyState === "complete") {
      resize();
    } else {
      window.addEventListener("load", resize);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", resize);
    }
  }, []);

  return (
    <div
      id="masonry"
      className="grid max-w-[1280px] flex-grow auto-rows-[20px] grid-cols-masonry gap-2.5 px-4"
    >
      <Articles articles={articles} />
    </div>
  );
};
