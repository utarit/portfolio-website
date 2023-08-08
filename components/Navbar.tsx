"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import NavLink from "./NavLink";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="flex gap-5 py-2">
      <Link href="/" className="group flex gap-3 items-center">
        <Image
          className="group-hover:rotate-[20deg] dark:invert"
          src="/images/footprint.png"
          height={24}
          width={24}
          alt="logo"
        />
        <h1>Mert Akça</h1>
      </Link>

      <nav className="flex gap-2">
        <NavLink
          href="/works"
          className={classNames("p-2", pathname === "/works" && "bg-teal-400")}
        >
          Works
        </NavLink>
        <NavLink
          href="/posts"
          className={classNames("p-2", pathname === "/posts" && "bg-teal-400")}
        >
          Posts
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
