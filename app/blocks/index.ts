import { Hero } from "./hero";
import { Blank } from "./blank";
import { Spacer32 } from "./spacer-32";
import { Spacer64 } from "./spacer-64";
import { MediaAndText } from "./media-and-text";
import { Slider } from "./slider";

/**
 * Small helper to return the matching component based on the key given by Strapi
 */
export const allBlocks = {
  "content.header": Hero,
  "content.content": Blank,
  "content.spacer-32": Spacer32,
  "content.spacer-64": Spacer64,
  "content.media-and-text": MediaAndText,
  "content.image-slider": Slider,
}
