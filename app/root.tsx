import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Grape, Instagram, Mail, Search } from "lucide-react";
import Header from "~/components/header/Header";
import { Navigation } from "~/components/navigation/Navigation";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStyles from "./styles/winewithmargaret.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: customStyles },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", href: "/_static/favicon.ico" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=League+Gothic&family=Poppins:ital,wght@0,100;0,300;0,400;0,700;1,400&display=swap" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Wine with Margaret",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
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
        <Outlet />
      </main>
      <aside className="row-start-2 row-end-2 col-start-2 col-end-2 border-l-2 border-l-gray-300 pt-6 px-2 flex flex-col items-center">
        <Grape />
      </aside>
    </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
