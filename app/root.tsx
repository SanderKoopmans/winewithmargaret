import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  Outlet,
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
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=League+Gothic&family=Poppins:ital,wght@0,100;0,300;0,400;0,700;1,400&display=swap",
    },
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
        <div className="grid h-full grid-cols-small grid-rows-small lg:grid-cols-main lg:grid-rows-main">
          <Header />
          {/* <aside className="col-span-1 row-span-1 border-l-2 border-l-gray-300 px-2 pt-8">
            <div className="flex h-full flex-col items-center gap-2 border-b-2 border-b-gray-300">
              <Instagram />
              <Mail />
              <Search />
            </div>
          </aside> */}
          <main className="row-span-3 flex h-full flex-col items-center justify-start lg:col-span-1 lg:row-span-2">
            <Navigation />
            <Outlet />
          </main>
          <aside className="hidden lg:col-start-2 lg:col-end-2 lg:row-start-2 lg:row-end-2 lg:flex lg:flex-col lg:items-center lg:border-l-2 lg:border-l-gray-300 lg:px-2 lg:pt-6">
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
