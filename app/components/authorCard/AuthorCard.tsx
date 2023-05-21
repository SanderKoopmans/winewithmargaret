import { Globe, Instagram, Linkedin } from "lucide-react";
import { Paragraph } from "../typography/Typography";

export const AuthorCard = ({ author }: any) => (
  <div>
    <div className="w-[300px] relative">
      <div className="absolute py-4 px-6 backdrop-blur w-full flex justify-end gap-4"><Instagram /><Linkedin /><Globe /></div>
      <img
        className="w-[300px] h-[300px] object-cover mb-6 rounded-sm"
        src={`http://localhost:1337${author.attributes.picture.data.attributes.url}`}
        alt={`Profile of ${author.attributes.name}`}
      />
      <div className="absolute bottom-0 top-[90%] left-[10%] bg-main px-10 py-6 w-[80%] flex items-center justify-center border rounded-sm border-main">
        <Paragraph className="text-white">{author.attributes.name || "No-name-found"}</Paragraph>
      </div>
    </div>
    <p className="pt-[20px]">{author.attributes.introduction || "No-introduction-found"}</p>
  </div>
);
