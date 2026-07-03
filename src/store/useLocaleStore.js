import { create } from "zustand";

export const useLocaleStore = create((set) => ({
  locale: "en",
  setLocale: (locale) => set({ locale }),
  toggleLocale: () =>
    set((state) => ({
      locale: state.locale === "en" ? "ar" : "en",
    })),
}));
