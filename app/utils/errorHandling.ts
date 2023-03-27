class APIResponseError extends Error {
  constructor(response: Response) {
    super(`API Error Response: ${response.status} ${response.statusText}`)
  }
}

export const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  } else {
    throw new APIResponseError(response)
  }
}

class MissingEnvironmentVariable extends Error {
  constructor(name: string) {
    super(`Missing Environment Variable: The ${name} environment variable must be defined`);
  }
}

export const checkEnvVars = () => {
  const envVars = [
    "STRAPI_URL_BASE",
    "STRAPI_API_TOKEN"
  ];

  for (const envVar of envVars) {
    if (! process.env[envVar]) {
      throw new MissingEnvironmentVariable(envVar)
    }
  }
}
