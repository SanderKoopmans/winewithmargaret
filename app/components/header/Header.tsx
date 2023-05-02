import { Link } from "@remix-run/react";
import { H1, H3 } from "../typography/Typography";
import { Instagram, Linkedin, Mail, Search } from "lucide-react";
import { Menu, MenuButton, MenuItems, MenuList, MenuPopover, useMenuButtonContext } from "@reach/menu-button";
import { useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { LINKS } from "../navigation/Navigation";

const MOBILE_LINKS = [{ name: 'Home', to: '/'}, ...LINKS]

const MobileMenuList = () => {
  const { isExpanded } = useMenuButtonContext();

  useEffect(() => {
    console.log(''.padEnd(80, '*'));
    console.log('IN USEFFECT');
    console.log(''.padEnd(80, '*'));
    if (isExpanded) {
      console.log('EXPANDED');
      console.log(''.padEnd(80, '8'));
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {/* {isExpanded ? (<div className="h-full bg-red-500">Open menu</div>) : null} */}
      {isExpanded ? (
        <MenuPopover
          position={r => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px +2.25rem)`,
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: 'block' }}
          className="z-50"
          >
            <motion.div
            initial={{y: -50, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: -50, opacity: 0}}
            transition={{
              duration: 0.15,
              ease: 'linear',
            }}
            className="bg-primary flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 dark:border-gray-600"
          >
            <MenuItems className="border-none bg-transparent p-0">
              {MOBILE_LINKS.map(link => (
                <Link to={link.to}>{link.name}</Link>
              ))}
            </MenuItems>
          </motion.div>
          </MenuPopover>
      ) : <h1>CLOSED</h1>}
    </AnimatePresence>
  )
}

const topVariants = {
  open: {rotate: 45, y: 7, originX: '16px', originY: '10px' },
  closed: {rotate: 0, y: 0, originX: 0, originY: 0 },
}

const centerVariants = {
  open: {opacity: 0},
  closed: {opacity: 1},
}

const bottomVariants = {
  open: {rotate: -45, y: -5, originX: '16px', originY: '22px' },
  closed: {rotate: 0, y: 0, originX: 0, originY: 0 },
}

const MobileMenu = () => (
  // button
  <Menu>
    {({ isExpanded }) => {
      const state = isExpanded ? 'open' : 'closed';
      const transition = {}
      return (
        <>
        <MenuButton>
        <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.rect
                  animate={state}
                  variants={topVariants}
                  transition={transition}
                  x="6"
                  y="9"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={centerVariants}
                  transition={transition}
                  x="6"
                  y="15"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <motion.rect
                  animate={state}
                  variants={bottomVariants}
                  transition={transition}
                  x="6"
                  y="21"
                  width="20"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
        </MenuButton>
        <MobileMenuList />
        </>
      )
    }}
  </Menu>

  // list
)

export default function Header({ titles }) {
  return (
    <>
      <aside className="row-span-1 w-full border-b-2 border-b-gray-300 px-4 py-2 lg:col-start-2 lg:col-end-2 lg:row-start-1 lg:row-end-1 lg:border-b-0 lg:border-l-2 lg:border-l-gray-300 lg:py-0 lg:px-2 lg:pt-8">
        <div className="flex h-full justify-between">
          <div className="block lg:hidden">
            {/* <Menu /> */}
            {/* <MobileMenuButton /> */}
            <MobileMenu />
          </div>
          <div className="flex gap-3 lg:h-full lg:flex-col lg:border-b-2 lg:border-b-gray-300">
            <a
              href="https://www.instagram.com/wine.with.margaret/"
              className="hover:cursor-pointer"
            >
              <Instagram />
            </a>
            <a
          href="https://www.linkedin.com/in/margot-van-lieshout/"
          className="hover:cursor-pointer"
        >
        <Linkedin />
        </a>
        <a
          href="mailto:growtogether@winewithmargaret.com"
          className="hover:cursor-pointer"
        >
          <Mail />
        </a>
            <Search />
          </div>
        </div>
      </aside>
      <header className="row-start-2 row-end-3 pt-8 lg:row-start-1 lg:row-end-2">
        <div className="flex flex-col items-center">
          <div>
            <Link to='/'>
              <H1>{titles.attributes.title}</H1>
            </Link>
            <div className="flex items-center justify-center py-5">
              <div className="hidden flex-grow border-t-2 border-gray-300 lg:block"></div>
              <H3 className="mx-8 flex-shrink">{titles.attributes.subtitle}</H3>
              <div className="hidden flex-grow border-t-2 border-gray-300 lg:block"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
