import React from "react";
import Link from "next/link";

import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="py-4 text-xs flex flex-col sm:flex-row justify-around gap-4 p-2 items-center bg-orange-300 dark:bg-gray-900">
      <p>Made by Mert Akça with 🧋 and 🎧</p>
      <Link
        href="https://github.com/utarit/portfolio-website"
        target="_blank"
        className="hover:underline"
      >
        Source code
      </Link>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
