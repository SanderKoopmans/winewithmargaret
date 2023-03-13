import { JSDOM } from 'jsdom';
import DOMPurify from "dompurify";
import { marked } from "marked";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * Method to create a URL with slug
 * 
 * @param category string name of the category the article belongs to
 * @param slug string unique slug for an article
 * @returns string
 */
export function buildLinkPath(category: string, slug: string): string {
  if (category === "Recipe") {
    return `/recipe/${slug}`;
  }
  return `/article/${slug}`;
}

export function parseContent(content: string) {
  const window = new JSDOM('').window;
  // @ts-ignore
  const purify = DOMPurify(window);
  const clean = purify.sanitize(marked(content));
  return clean;
}
