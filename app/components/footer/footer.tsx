import { Instagram, Linkedin, Mail } from "lucide-react";
import { H3, H4, Paragraph } from "../typography/Typography";
import { Link } from "@remix-run/react";

const LINKS = [
  { name: 'Home', to: '/'},
  { name: 'Margaret', to: '/margaret'},
  { name: 'Articles', to: '/articles'},
  // { name: 'Wandering Wine', to: '/wandering-wine'},
  { name: 'Woman in Wine', to: '/woman-in-wine'},
  // { name: 'Shop', to: '/shop'},
  { name: 'Contact', to: '/contact'},
  { name: 'Privacy Policy', to: '/privacy-policy'},
  { name: 'Sitemap', to: '/sitemap'},
]
type Item = {
  to: string;
  name: string;
}

const MenuItem = (props: { item: Item }) => (
  <li className="">
    <Link to={props.item.to}>{props.item.name}</Link>
  </li>
)

export const Footer = () => (
  <footer className="col-span-1 w-full bg-black pt-20 pb-10 text-white lg:col-start-1 lg:col-end-3 lg:row-start-3">
    <div className="footer-wrapper mx-auto px-6 lg:grid lg:max-w-7xl lg:grid-cols-footer-main lg:grid-rows-footer-main lg:gap-y-20">
      <div className="lg:col-start-1 lg:col-end-7 lg:grid lg:grid-cols-footer-links-lg">
        <H3 className="mb-10 uppercase text-white lg:col-start-1 lg:col-end-3">
          @Wine.with.margeret
        </H3>
        <ul className="mb-10 grid grid-cols-footer-links gap-y-10 gap-x-4 uppercase lg:col-start-4 lg:col-end-7">
          {LINKS.map((item, i) => <MenuItem item={item} key={`${i}+${item.name}`} />)}
        </ul>
      </div>
      <div className="newsletter-signup mb-10 lg:col-start-8 lg:col-end-13">
        <H4 className="mb-4 text-white">Sign up for our newsletter</H4>
        <form action="post">
          <div className="mb-4 flex flex-col lg:flex-row gap-4">
            <label htmlFor="name">
              Name:
              <input
                className="p-2 ml-2"
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="name">
              Email:
              <input
                className="p-2 ml-2"
                name="email"
                type="email"
                placeholder="Your email"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-primary px-8 py-2 transition-colors duration-200 hover:cursor-pointer hover:bg-secondary"
          >
            Sign-up
          </button>
        </form>
      </div>
      <div className="socials mb-10 flex gap-4 lg:row-start-2 lg:row-end-3">
        <a
          href="https://www.instagram.com/wine.with.margaret/"
          className="hover:cursor-pointer"
          target="_blank"
        >
          <Instagram />
        </a>
        <a
          href="https://www.linkedin.com/in/margot-van-lieshout/"
          className="hover:cursor-pointer"
          target="_blank"
        >
        <Linkedin />
        </a>
        <a
          href="mailto:growtogether@winewithmargaret.com"
          className="hover:cursor-pointer"
        >
          <Mail />
        </a>
      </div>
      <div className="copyright lg:col-start-8 lg:col-end-13 lg:row-start-2 lg:row-end-3">
        <Paragraph className="text-sm">
          © {new Date().getFullYear()} - Wine with Margaret
        </Paragraph>
      </div>
    </div>
  </footer>
);
