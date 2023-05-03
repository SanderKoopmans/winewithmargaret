import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  Outlet,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import Header from "~/components/header/Header";
import { Navigation } from "~/components/navigation/Navigation";
import { Footer } from "./components/footer/footer";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStyles from "./styles/winewithmargaret.css";
import { checkEnvVars, checkStatus } from "./utils/errorHandling";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: customStyles },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", type: "image/svg+xml", href: "/_static/favicon.svg" },
    { rel: "icon", type: "image/png", href: "/_static/favicon.png" },
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

export async function loader() {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/page-title`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  checkStatus(response);

  const data = await response.json();

  if (data.error) {
    throw new Response("Error loading data from strapi", { status: 500 });
  }
  return json({
    data,
    ENV: {
      API_URL: process.env.STRAPI_URL_BASE,
    },
  });
}

export default function Root() {
  const data = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
      <div className="grid h-full grid-cols-small grid-rows-small justify-items-center lg:grid-cols-main lg:grid-rows-main">
          <Header titles={data.data.data} />
          <main className="col-start-1 col-end-1 row-start-3 row-end-4 flex h-full w-[95%] max-w-7xl flex-col lg:row-start-2 lg:row-end-2 xl:w-11/12 2xl:w-10/12">
            <Navigation />
            <Outlet />
          </main>
          <aside className="hidden w-full lg:col-start-2 lg:col-end-2 lg:row-start-2 lg:row-end-3 lg:flex lg:h-full lg:flex-col lg:items-center lg:border-l-2 lg:border-l-gray-300 lg:px-2 lg:pt-6">
            <div className="flex-grow">
              <img className="w-[24px]" src="/_static/grape.svg" alt="Bunch of grapes" />
            </div>
          </aside>
          <Footer />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
