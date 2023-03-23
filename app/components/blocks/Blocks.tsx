import { allBlocks } from "~/blocks";

export const Blocks = () => {
  const componentNames = Object.keys(allBlocks);
  console.log(
    "🚀 ~ file: Blocks.tsx:5 ~ Blocks ~ componentNames:",
    componentNames
  );

  return <p>Block component!</p>;
};
