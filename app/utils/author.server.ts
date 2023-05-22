import { checkEnvVars, checkStatus } from "./errorHandling";

export const getAuthors = async (query: any) => {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/authors?${query}`, {
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

  return data.data;
};

export const getAuthorIntro = async () => {
  checkEnvVars();

  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/author-intro`, {
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

  return data.data;
};
