import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 text-xs mt-4 flex flex-col justify-between items-center gap-1">
      <address>
        Contact:{" "}
        <a href="mailto:mertakca.dev@gmail.com">mertakca.dev@gmail.com</a>
      </address>
      <p>Made by Mert Akça with 🧋 and 🎧</p>
    </footer>
  );
};

export default Footer;
