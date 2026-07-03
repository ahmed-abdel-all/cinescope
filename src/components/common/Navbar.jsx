import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/favorites", label: "Favorites" },
    { to: "/profile", label: "Profile" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <header>
      <h2>CineScope</h2>
      <nav aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
