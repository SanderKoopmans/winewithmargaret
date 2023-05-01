import { Link } from "@remix-run/react";
import { useLocation } from "@remix-run/react";
import clsx from "clsx";

const LINKS = [
  { name: 'Margaret', to: '/margaret'},
  { name: 'Articles', to: '/articles'},
  // { name: 'Wandering Wine', to: '/wandering-wine'},
  { name: 'Woman in Wine', to: '/woman-in-wine'},
  // { name: 'Shop', to: '/shop'},
  { name: 'Contact', to: '/contact'},
]

type Item = {
  to: string;
  name: string;
}

const MenuItem = (props: { item: Item }) => {
  const location = useLocation()
  const isSelected =
    props.item.to === location.pathname || location.pathname.startsWith(`${props.item.to}/`)

  return (
  <li className={clsx("border-t-4 px-6 pt-4 uppercase", {
      'border-t-black -mt-px': isSelected,
      'border-t-transparent': !isSelected,
  })}>
      <Link to={props.item.to}>{props.item.name}</Link>
  </li>
)}

export const Navigation = () => (
  <nav className="hidden items-center border-t-2 border-t-gray-300 lg:flex lg:w-[95%] xl:w-[98%]">
    <ul className="mx-auto mb-4 flex gap-4">
      {LINKS.map((item, i) => <MenuItem item={item} key={`${i}+${item.name}`} />)}
    </ul>
  </nav>
)