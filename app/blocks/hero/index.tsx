import { H1 } from "~/components/typography/Typography";
import { variables } from "~/config/variables";

export const Hero = ({ data: { title, image } }) => (
  <>
    <img
      src={`${variables.API_URL}${image.data.attributes.url}`}
      alt="alt-here"
    />
    <H1>{title}</H1>
  </>
);
