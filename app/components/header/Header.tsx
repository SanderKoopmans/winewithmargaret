import { H1, H3 } from "../typography/Typography";
import { Instagram, Mail, Menu, Search } from "lucide-react";

export default function Header() {
  return (
    <>
      <aside className="row-span-1 w-full border-b-2 border-b-gray-300 px-4 py-2 lg:col-start-2 lg:col-end-2 lg:row-start-1 lg:row-end-1 lg:border-b-0 lg:border-l-2 lg:border-l-gray-300 lg:py-0 lg:px-2 lg:pt-8">
        <div className="flex h-full justify-between">
          <div className="block lg:hidden">
            <Menu />
          </div>
          <div className="flex gap-2 lg:h-full lg:flex-col lg:border-b-2 lg:border-b-gray-300">
            <a
              href="https://www.instagram.com/wine.with.margaret/"
              className="hover:cursor-pointer"
            >
              <Instagram />
            </a>
            <Mail />
            <Search />
          </div>
        </div>
      </aside>
      <header className="row-start-2 row-end-3 pt-8 lg:row-start-1 lg:row-end-2">
        <div className="flex flex-col items-center">
          <div>
            <H1>Wine.with.Margaret</H1>
            <div className="flex items-center justify-center py-5">
              <div className="hidden flex-grow border-t-2 border-gray-300 lg:block"></div>
              <H3 className="mx-8 flex-shrink">Subtitle goes in this place</H3>
              <div className="hidden flex-grow border-t-2 border-gray-300 lg:block"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
