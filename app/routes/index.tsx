import { Grape, Instagram, Mail, Search } from "lucide-react";
import { useEffect } from "react";
import { Articles } from "~/components/articles/Articles";
import Header from "~/components/header/Header";
import { Navigation } from "~/components/navigation/Navigation";

export default function Index() {
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
    <div className="page-wrapper grid grid-rows-main grid-cols-main h-full">
      <Header />
      <aside className="col-span-1 row-span-1 border-l-2 border-l-gray-300 px-2 pt-8">
        <div className="h-full border-b-2 border-b-gray-300 flex flex-col gap-2 items-center">
          <Instagram />
          <Mail />
          <Search />
        </div>
      </aside>
      <main className="col-span-1 row-start-2 row-end-2 h-full flex flex-col justify-start items-center">
        <Navigation />
        <div id="masonry" className="wrapper grid gap-2.5 grid-cols-masonry auto-rows-[20px] max-w-[1280px] w-full h-full">
          <Articles />
        </div>
      </main>
      <aside className="row-start-2 row-end-2 col-start-2 col-end-2 border-l-2 border-l-gray-300 pt-6 px-2 flex flex-col items-center">
        <Grape />
      </aside>
    </div>
  );
}
