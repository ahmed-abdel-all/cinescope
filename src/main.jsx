import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import useThemeStore from "./store/useThemeStore";
import { useLocaleStore } from "./store/useLocaleStore";
import "./styles/index.css";

const queryClient = new QueryClient();

function AppPreferencesSync() {
  const theme = useThemeStore((state) => state.theme);
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return null;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppPreferencesSync />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
