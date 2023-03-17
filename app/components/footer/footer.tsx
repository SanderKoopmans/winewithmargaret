import { Facebook, Instagram, Twitter } from "lucide-react";
import { H3, H4, Paragraph } from "../typography/Typography";

export const Footer = () => (
  <footer className="col-start-1 col-end-3 w-full bg-black pt-20 pb-10 text-white lg:row-start-3">
    <div className="footer-wrapper mx-auto px-6 lg:grid lg:max-w-7xl lg:grid-cols-footer-main lg:grid-rows-footer-main lg:gap-y-20">
      <div className="lg:col-start-1 lg:col-end-7 lg:grid lg:grid-cols-footer-links-lg">
        <H3 className="mb-10 uppercase text-white lg:col-start-1 lg:col-end-3">
          @Wine.with.margeret
        </H3>
        <ul className="mb-10 grid grid-cols-footer-links gap-y-10 gap-x-4 uppercase lg:col-start-4 lg:col-end-7">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
          <li>Sitemap</li>
        </ul>
      </div>
      <div className="newsletter-signup mb-10 lg:col-start-8 lg:col-end-13">
        <H4 className="mb-4 text-white">Sign up for our newsletter</H4>
        <form action="post">
          <div className="mb-4 flex gap-4">
            <label htmlFor="name">
              Name:
              <input
                className="p-2"
                name="name"
                type="text"
                placeholder="Your Name"
              />
            </label>
            <label htmlFor="name">
              Email:
              <input
                className="p-2"
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
        <Instagram />
        <Facebook />
        <Twitter />
      </div>
      <div className="copyright lg:col-start-8 lg:col-end-13 lg:row-start-2 lg:row-end-3">
        <Paragraph className="text-sm">
          © {new Date().getFullYear()} - Wine with Margaret
        </Paragraph>
      </div>
    </div>
  </footer>
);
