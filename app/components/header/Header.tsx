import { H1, H3 } from "../typography/Typography";

export default function Header() {
  return (
    <header className="col-span-1 row-span-1 flex flex-col items-center justify-center pt-8">
      <div>
        <H1>Wine.with.Margaret</H1>
        <div className="flex items-center py-5">
          <div className="flex-grow border-t-2 border-gray-300"></div>
          <H3 className="mx-8 flex-shrink">Subtitle goes in this place</H3>
          <div className="flex-grow border-t-2 border-gray-300"></div>
        </div>
      </div>
    </header>
  );
}
