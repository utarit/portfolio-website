"use client";

import { ChangeEvent } from "react";

import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as "system" | "light" | "dark");
  };

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
