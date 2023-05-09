import { OrderedList, UnOrderedList } from "~/components/list/List";
import { Quote } from "~/components/quote/Quote";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
} from "~/components/typography/Typography";
/**
 * Takes an array of blocks, with either header or paragraph type.
 * Return the matching typography component
 *
 * @returns Component, various typography components
 */

const renderHeaderType = (header) => {
  switch (header.data.level) {
    case 1:
      return <H1 className="mb-4">{header.data.text}</H1>;
    case 2:
      return <H2 className="mb-4">{header.data.text}</H2>;
    case 3:
      return <H3 className="mb-4">{header.data.text}</H3>;
    case 4:
      return <H4 className="mb-4">{header.data.text}</H4>;
    case 5:
      return <H5 className="mb-4">{header.data.text}</H5>;
    case 6:
      return <H6 className="mb-4">{header.data.text}</H6>;
    default:
      return (
        <Paragraph dangerouslySetInnerHTML={{ __html: header.data.text }} />
      );
  }
};

const renderListType = (list) => {
  switch (list.data.style) {
    case "unordered":
      return <UnOrderedList listItems={list.data.items} />;
    default:
      return <OrderedList listItems={list.data.items} />;
  }
};

const renderImage = (image) => (
  <>
    <img src={`${image.data.file.url}`} alt={image.data.file.alternativeText || 'No alternative description found'} />
    {image.data.caption && <Paragraph>{image.data.caption}</Paragraph>}
  </>
)

export const Blank = (block) => {
  const parsedContent = JSON.parse(block.data.blank);

  /**
   * Map over block content
   * For each item, find corresponding Typography component
   *
   * Return array of Typography components to render
   */
  return parsedContent.blocks.map((block) => {
    switch (block.type) {
      case "header":
        return renderHeaderType(block);
      case "list":
        return renderListType(block);
      case "quote":
        return <Quote content={block.data} />;
      case "image":
        return renderImage(block);
      default:
        return (
          <Paragraph
            className="mb-4 [&>a]:text-blue-500 [&>a]:underline [&>mark]:my-0.5 [&>mark]:rounded-sm [&>mark]:bg-[#A8575B] [&>mark]:px-1 [&>mark]:text-white"
            dangerouslySetInnerHTML={{ __html: block.data.text }}
          />
        );
    }
  });
};
