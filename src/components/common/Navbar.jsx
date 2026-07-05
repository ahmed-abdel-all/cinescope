import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import { useLocaleStore } from "../../store/useLocaleStore";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const labels = {
  en: {
    home: "Home",
    movies: "Movies",
    search: "Search",
    favorites: "Favorites",
    profile: "Profile",
    login: "Login",
    register: "Register",
    logout: "Logout",
  },
  ar: {
    home: "الرئيسية",
    movies: "الأفلام",
    search: "البحث",
    favorites: "المفضلة",
    profile: "الملف الشخصي",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    logout: "تسجيل الخروج",
  },
};

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const locale = useLocaleStore((state) => state.locale);
  const navLabels = labels[locale] || labels.en;

  const links = [
    { to: "/", label: navLabels.home },
    { to: "/movies", label: navLabels.movies },
    { to: "/search", label: navLabels.search },
    { to: "/favorites", label: navLabels.favorites },
    { to: "/profile", label: navLabels.profile },
  ];

  const authLinks = [
    { to: "/login", label: navLabels.login },
    { to: "/register", label: navLabels.register },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--app-border)] bg-[var(--app-surface)]/90 backdrop-blur-xl transition-colors">
      <div className="max-w-container-max mx-auto flex min-h-16 flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav
          aria-label="Main navigation"
          className="order-3 flex w-full items-center gap-4 overflow-x-auto md:order-none md:w-auto md:gap-6"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-label-caps text-label-caps whitespace-nowrap uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                    ? "text-red-300 font-bold"
                    : "text-[var(--app-muted)] hover:text-red-300"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageToggle />
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleLogout}
              className="font-label-caps text-label-caps rounded-full px-4 py-2 text-[var(--app-text)] transition-all duration-300 hover:bg-red-500/10"
            >
              {navLabels.logout}
            </button>
          ) : (
            authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-label-caps text-label-caps rounded-full px-4 py-2 transition-all duration-300 ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-[var(--app-text)] hover:bg-red-500/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
