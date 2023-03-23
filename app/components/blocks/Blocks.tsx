import { allBlocks } from "~/blocks";

/**
 * Take an API response, map over the 'allBlocks', return matching component with data from API
 *
 * @returns Component
 */
export const Blocks = () => {
  const componentNames = Object.keys(allBlocks);
  console.log(
    "🚀 ~ file: Blocks.tsx:5 ~ Blocks ~ componentNames:",
    componentNames
  );

  return <p>Block component!</p>;
};
