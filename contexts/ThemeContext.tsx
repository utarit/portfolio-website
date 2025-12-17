"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "system" | "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getCookieTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const cookies = document.cookie.split(";");
  const themeCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("theme=")
  );
  if (themeCookie) {
    const value = themeCookie.split("=")[1]?.trim();
    return (value as Theme) || null;
  }
  return null;
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const cookieTheme = getCookieTheme();
  if (cookieTheme) return cookieTheme;
  const stored = localStorage.getItem("theme");
  if (stored) {
    document.cookie = `theme=${stored}; path=/; max-age=31536000; SameSite=Lax`;
    return (stored as Theme) || null;
  }
  return null;
}

function setCookieTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const themeFromStorage = theme;

  if (
    themeFromStorage === "dark" ||
    (themeFromStorage !== "light" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return getStoredTheme() || "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = getStoredTheme();
    if (stored === "dark") return "dark";
    if (stored === "light") return "light";
    return getSystemTheme();
  });

  useEffect(() => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    applyTheme(theme);
    setResolvedTheme(resolved);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
        setResolvedTheme(getSystemTheme());
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    setCookieTheme(newTheme);
    applyTheme(newTheme);
    const resolved = newTheme === "system" ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
