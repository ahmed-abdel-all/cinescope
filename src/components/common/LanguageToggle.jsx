import { useLocaleStore } from "../../store/useLocaleStore";

function LanguageToggle() {
  const locale = useLocaleStore((state) => state.locale);
  const toggleLocale = useLocaleStore((state) => state.toggleLocale);

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Toggle language"
      className="rounded-full border border-[var(--app-border)] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[var(--app-text)] transition hover:border-red-400/60"
    >
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}

export default LanguageToggle;
