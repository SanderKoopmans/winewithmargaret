import clsx from "clsx";
import { Blank } from "../blank";

export const MediaAndText = ({ data }) => {
  const containerClass = clsx(
    "flex flex-col lg:flex-row w-full gap-10 justify-center py-10",
    {"lg:flex-row-reverse": data.textRight}
  )
  return (
    <div className={containerClass}>
      <div className="flex flex-col w-full lg:w-[45%]">
        <Blank content={data.text.blank} />
      </div>
      <div className="w-full lg:w-[45%]">
        <img
          src={`${data.image.data.attributes.formats.medium.url}`}
          alt={data.image.data.attributes.alternativeText}
          width={`${data.image.data.attributes.formats.medium.width}px`}
          height={`${data.image.data.attributes.formats.medium.height}px`}
        />
      </div>
    </div>
  )
};
