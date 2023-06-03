import { Paragraph } from "~/components/typography/Typography";

export const Slider = ({ data }) => {
  console.log("Content: ", data);
  return (<div className="w-full overflow-hidden">
    <ul className="flex relative w-full">
      {data.images.data.map(img => <li key={img.attributes.name} className="w-[80%]"><img src={`http://localhost:1337${img.attributes.url}`} alt={img.attributes.alternativeText} /></li>)}
    </ul>
  </div>)
};
