import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <header className="flex gap-5 py-5">
      <Link href="/" className="group flex gap-3">
        <Image
          className="group-hover:rotate-[20deg] dark:invert"
          src="/images/footprint.png"
          height={24}
          width={24}
          alt="logo"
        />
        <h1>Mert Akça</h1>
      </Link>

      <nav className="flex gap-4">
        <NavLink href="/works">Works</NavLink>
        <NavLink href="/posts">Posts</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
