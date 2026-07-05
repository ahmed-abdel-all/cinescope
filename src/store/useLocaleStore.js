import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLocaleStore = create(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({
          locale: state.locale === "en" ? "ar" : "en",
        })),
    }),
    {
      name: "locale-storage",
    }
  )
);
