import useThemeStore from "../../store/useThemeStore";

function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--app-text)] transition hover:border-red-400/60"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;
