import React from "react";

import { Button } from "@/design-system/Button";

import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="py-4 text-sm flex flex-col sm:flex-row justify-around gap-4 p-2 items-center bg-background-200">
      <p>Made by Mert Akça with 🧋 and 🎧</p>
      <Button
        href="https://github.com/utarit/portfolio-website"
        target="_blank"
        variant="text"
        size="sm"
      >
        Source code
      </Button>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
