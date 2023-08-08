import React from "react";

import ThemeToggle from "./ThemeToggle";

const Footer = () => {
  return (
    <footer className="py-4 text-xs mt-4 flex justify-around gap-4 p-2 items-center bg-orange-300 dark:bg-gray-900">
      <address>
        Contact:{" "}
        <a className="hover:underline" href="mailto:mertakca.dev@gmail.com">
          mertakca.dev@gmail.com
        </a>
      </address>
      <p>Made by Mert Akça with 🧋 and 🎧</p>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
