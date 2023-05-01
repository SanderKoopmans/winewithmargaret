import { useState } from "react";

export const MobileMenuButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
    console.log('isOpen: ', isOpen);
  
    return (
      <button
        className="flex flex-col h-8 w-8 rounded justify-center items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
              : "opacity-100 group-hover:opacity-50"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? "opacity-0" : "opacity-100 group-hover:opacity-50"
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-rotate-45 -translate-y-3 opacity-100 group-hover:opacity-50"
              : "opacity-100 group-hover:opacity-50"
          }`}
        />
      </button>
    );
  };
