import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/${id}`);
  };

  const footerLinks = [
    { id: "contact", label: "Contact Us" },
    { id: "about", label: "About Us" },
    { id: "form", label: "Get Quote" },
  ];

  return (
    <footer
      className="px-4 divide-y-2 transition-opacity duration-500 bg-secondary text-teritory"
    >
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          {/* Fix: Use Link from react-router-dom for navigation, not ScrollLink */}
          <Link
            to="/"
            className="flex justify-start lg:justify-start cursor-pointer pl-3"
          >
            {!logoLoaded && (
              <div className="h-24 w-24 animate-pulse rounded-md"></div>
            )}
            <img
              src="/assets/images/logo.png"
              alt="USA SOLARS LOGO"
              className={`h-24 w-24 transition-opacity duration-500 ${
                logoLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLogoLoaded(true)}
            />
          </Link>
          <h1 className="font-bold text-2xl">
            Solar Solutions, <span className="text-heading">Made Simple.</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-heading hover-animation hover:text-tertiary">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <ScrollLink
                    to={link.id}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer hover:text-heading"
                    onClick={() => handleNavigate(link.id)}
                  >
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase text-heading hover-animation hover:text-tertiary">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy-policy" className="hover:text-heading">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/user-terms" className="hover:text-heading">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/california-privacy" className="hover:text-heading">
                  California Privacy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase text-heading hover-animation hover:text-tertiary">
              Social Media
            </h3>
            <div className="flex justify-start space-x-3">
              <a href="#" title="Facebook" className="text-[#155dfc] hover:text-blue-800">
                <FaFacebookF size={20} />
              </a>
              <a href="#" title="Twitter" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={20} />
              </a>
              <a href="#" title="Instagram" className="text-[#f6339a] hover:text-pink-700">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center text-heading">
        © USA Solars Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
