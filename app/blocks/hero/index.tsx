import { H1 } from "~/components/typography/Typography";

export const Hero = ({ data: { title, image } }) => (
  <>
    <H1 className="mb-8">{title}</H1>
    <img
      className="mb-8 w-1/2"
      src={`${window.ENV.API_URL}${image.data.attributes.url}`}
      alt="alt-here"
    />
  </>
);
