function getEnv() {
  return {
    API_URL: process.env.STRAPI_URL_BASE,
  }
}

type ENV = ReturnType<typeof getEnv>

// App puts these on
declare global {
  // eslint-disable-next-line
  var ENV: ENV
  interface Window {
    ENV: ENV
  }
}

export { getEnv };
