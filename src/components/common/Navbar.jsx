import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/search", label: "Search" },
    { to: "/favorites", label: "Favorites" },
    { to: "/profile", label: "Profile" },
  ];

  const authLinks = [
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface-container-low/60 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-gutter h-16 flex items-center justify-between">
        <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter">
          CineScope
        </h2>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-label-caps text-label-caps uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? "text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {authLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-label-caps text-label-caps px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-variant/20"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;