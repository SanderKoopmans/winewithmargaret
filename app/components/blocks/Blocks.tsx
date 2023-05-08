// @ts-nocheck
import { allBlocks } from "~/blocks";

/**
 * Take an API response, map over the 'allBlocks', return matching component with data from API
 *
 * @returns Component
 */
export const Blocks = ({ blocks }) => {
  if (!blocks?.length) {
    return null;
  }
  return blocks.map((block, index) => {
    console.log("🚀 ~ file: Blocks.tsx:39 ~ returnblocks.map ~ block:", block)
    const blockType = block.__component ?? block.type;
    const blockKey = `${block.id}-${blockType}`;
    const blockData = block.__component
      ? block
      : {
          ...block.data,
          __component: blockType,
          id: block.id,
        };

    const blockProps = {
      key: blockKey,
      blockIndex: index,
      data: blockData,
    };

    const Block = allBlocks[blockType];
    console.log("🚀 ~ file: Blocks.tsx:33 ~ returnblocks.map ~ Block:", blockType)

    if (!Block) {
      console.warn(`Block type ${blockType} is not defined.`, block);
    }

    return <Block {...blockProps} />;
  });
};
