import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import { useEffect } from "react";
import clsx from "clsx";

export const LINKS = [
  { name: <img className="w-[24px]" src="/_static/grape.svg" alt="" />, to: "/" },
  { name: "Margaret", to: "/margaret"},
  { name: "Articles", to: "/articles"},
  // { name: 'Wandering Wine', to: '/wandering-wine'},
  { name: "Women in Wine", to: "/women-in-wine"},
  // { name: 'Shop', to: '/shop'},
  { name: "Contact", to: "/contact"},
]

type Item = {
  to: string;
  name: string | React.ReactNode;
}

const MenuItem = (props: { item: Item, handleNavClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }) => {
  const location = useLocation();

  const isSelected =
    props.item.to === location.pathname || location.pathname.startsWith(`${props.item.to}/`)

  return (
    <li className={clsx("border-t-4 px-6 pt-4 uppercase border-t-transparent", {
      "active": isSelected,
    })}>
      <Link to={props.item.to} onClick={props.handleNavClick}>{props.item.name}</Link>
    </li>
  )}

export const Navigation = () => {
  useEffect(() => {
    function sethighlight() {
      const activeNav = document.getElementsByClassName("active");
      const tabHighlighter = document.getElementById("tab-highlighter");
      if (tabHighlighter) {
        tabHighlighter.style.left = activeNav[0].offsetLeft + "px";
        tabHighlighter.style.width = activeNav[0].offsetWidth + "px";
      }
    }
    sethighlight();

    window.addEventListener("resize", sethighlight);

    if (document.readyState === "complete") {
      sethighlight();
    } else {
      window.addEventListener("onreadystate", sethighlight);
      // Remove the event listener when component unmounts
      return () => {
        window.removeEventListener("onreadystate", sethighlight);
        window.removeEventListener("resize", sethighlight);
      };
    }
  }, []);

  const handleNavClick = (event: any) => {
    const tabHighlighter = document.getElementById("tab-highlighter");
    if (tabHighlighter) {
      tabHighlighter.style.left = event.target.closest("li").offsetLeft + "px";
      tabHighlighter.style.width = event.target.closest("li").offsetWidth + "px";
    }
  };
  
  return (
    <nav className="hidden border-t-2 border-t-gray-300 lg:flex lg:w-[95%] xl:w-[98%]">
      <div className="flex flex-col mx-auto">
        <ul className="mx-auto mb-4 flex">
          {LINKS.map((item, i) => <MenuItem item={item} handleNavClick={handleNavClick} key={`${i}+${item.name}`} />)}
        </ul>
        <div id="tab-highlighter" className="tab-highlighter"/>
      </div>
    </nav>
  )}
