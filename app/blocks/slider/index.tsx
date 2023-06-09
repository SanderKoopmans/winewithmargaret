import { Paragraph } from "~/components/typography/Typography";

export const Slider = ({ data }) => {
  console.log("Content: ", data);
  return (<div className="overflow-hidden relative min-h-[500px] w-[900px] flex mx-auto">
    <ul className="flex mx-auto basis-[700px]">
      {data.images.data.map(img => <li key={img.attributes.name} className="relative max-w-[700px] grow-0 shrink-0 basis-full"><img src={`http://localhost:1337${img.attributes.url}`} alt={img.attributes.alternativeText} className="absolute max-w-[700px]"/></li>)}
    </ul>
  </div>)
};
