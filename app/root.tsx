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
        <div className="grid h-full grid-cols-small grid-rows-small justify-items-center lg:grid-cols-main lg:grid-rows-main">
          <Header />
          <main className="col-span-2 row-span-2 flex h-full w-11/12 flex-col sm:w-10/12 md:w-5/6 lg:w-9/12">
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
