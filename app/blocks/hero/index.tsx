import { H1 } from "~/components/typography/Typography";

export const Hero = ({ data }) => {
  return (
    <>
      <img
        className="mb-8 w-full"
        src={`${data.image.data.attributes.url}`}
        alt={data.image.data.attributes.alternativeText}
      />
      <H1 className="mb-8">{data.title}</H1>
    </>
  )};
