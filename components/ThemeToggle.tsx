"use client";

import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const themeFromStorage = localStorage.getItem("theme");
    if (themeFromStorage) {
      setTheme(themeFromStorage as Theme);
    }
  }, []);

  useEffect(() => {
    const handleEvent = (event: MediaQueryListEvent) => {
      const themeFromStorage = localStorage.getItem("theme");

      if (themeFromStorage !== "system") return;

      const newColorScheme = event.matches ? "dark" : "light";
      if (newColorScheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleEvent);

    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleEvent);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Theme;

    setTheme(value);
    localStorage.setItem("theme", value);

    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else if (value === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // value === system
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  return (
    <label>
      Theme:{" "}
      <select
        className="dark:text-black p-1"
        name="theme"
        value={theme}
        onChange={handleChange}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
};

export default ThemeToggle;
