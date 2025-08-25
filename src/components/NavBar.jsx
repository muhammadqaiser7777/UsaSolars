import { useState } from "react";
import { Link } from "react-router-dom";

// Custom styles for navbar buttons
const navButtonStyles = `
.nav-btn {
  position: relative;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  transition: transform 0.2s cubic-bezier(.4,0,.2,1), border-color 0.2s, color 0.2s;
  overflow: hidden;
}
.nav-btn::before {
  content: "";
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  background: linear-gradient(90deg, #d3af85ff 0%, #fe9929 100%);
  transform: scaleX(0);
  transform-origin: var(--mouse-x, left);
  transition: transform 0.4s cubic-bezier(.4,0,.2,1);
  z-index: 0;
}
.nav-btn:hover, .nav-btn.active {
  border-color: #fe9929;
  color: #2563eb !important;
  transform: scale(1.1);
}
.nav-btn:hover::before, .nav-btn.active::before {
  transform: scaleX(1);
}
.nav-btn span {
  position: relative;
  z-index: 1;
  transition: color 0.2s;
}
.nav-btn:hover span, .nav-btn.active span {
  color: #2563eb;
}
.nav-btn-group:hover .nav-btn:not(:hover) {
  transform: scale(1.05);
}
`;

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/form", label: "Get Quote" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="p-4 bg-primary text-teritory fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container flex justify-between h-16 mx-auto">
        {/* Logo */}
        <div className="flex items-center p-2">
          <Link to="/" className="cursor-pointer text-lg font-bold">
            <img src="/assets/images/logo.png" alt="USA SOLARS LOGO" className="h-24 w-auto" />
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className="flex justify-end p-4 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <ul
          className={`nav-btn-group ${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-stretch space-y-3 md:space-y-0 md:space-x-3 absolute md:static top-16 left-0 w-full md:w-auto bg-primary md:bg-transparent md:top-0 p-4 md:p-0`}
        >
          {menuItems.map((item, idx) => (
            <li key={item.path} className="flex">
              <Link
                to={item.path}
                className={`nav-btn block w-full px-4 py-4 cursor-pointer${item.label === 'Get Quote' ? ' font-bold italic' : ''}${hoveredIdx === idx ? ' active' : ''}`}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={e => {
                  setHoveredIdx(idx);
                  // Set mouse position for background fill
                  const rect = e.target.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  e.target.style.setProperty('--mouse-x', x < 50 ? 'left' : 'right');
                }}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default NavBar;

// Inject custom styles for nav buttons
if (typeof document !== 'undefined' && !document.getElementById('nav-btn-styles')) {
  const style = document.createElement('style');
  style.id = 'nav-btn-styles';
  style.innerHTML = navButtonStyles;
  document.head.appendChild(style);
}
