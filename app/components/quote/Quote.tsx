import { Paragraph, H3 } from "../typography/Typography";

export const Quote = ({ content }) => (
  <blockquote className="border-l-4 border-[#290000] bg-[#F1E4E5] px-4 py-6 text-[#290000]">
    <H3 className="mb-4">"{content.text}"</H3>
    <Paragraph>-- {content.caption}</Paragraph>
  </blockquote>
);
