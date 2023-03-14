import { Link } from "@remix-run/react";

export const Navigation = () => (
  <nav className="hidden items-center border-t-2 border-t-gray-300 lg:flex lg:w-[95%] xl:w-[98%]">
    <ul className="mx-auto mb-4 flex gap-4">
      <li className="border-t-4 border-t-black px-6 pt-4 font-bold transition-colors duration-300 hover:bg-main">
        <Link to="/">Blog</Link>
      </li>
      <li className="border-t-4 border-t-transparent px-6 pt-4">
        <Link to="/about">About</Link>
      </li>
      <li className="border-t-4 border-t-transparent px-6 pt-4">
        <Link to="/courses">Courses</Link>
      </li>
      <li className="border-t-4 border-t-transparent px-6 pt-4">
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </nav>
);
