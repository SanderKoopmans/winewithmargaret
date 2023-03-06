import { Link } from "@remix-run/react";

export const Navigation = () => (
        <nav className="wrapper border-t-2 border-t-gray-300 flex items-center">
          <ul className="flex gap-4 mx-auto mb-4">
            <li className="border-t-4 px-6 pt-4 border-t-black font-bold hover:bg-main transition-colors duration-300">
              <Link to="/">
                Blog
              </Link>
            </li>
            <li className="border-t-4 px-6 pt-4 border-t-transparent">
              <Link to="/about">
                About
              </Link>
            </li>
            <li className="border-t-4 px-6 pt-4 border-t-transparent">
              <Link to="/courses">
                Courses
              </Link>
            </li>
            <li className="border-t-4 px-6 pt-4 border-t-transparent">
              <Link to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
);
