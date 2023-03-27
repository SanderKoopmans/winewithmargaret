import { Hero } from "./hero";
import { Blank } from "./blank";

/**
 * Small helper to return the matching component based on the key given by Strapie
 */
export const allBlocks = {
  "content.header": Hero,
  "content.content": Blank,
}
