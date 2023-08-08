"use client";

import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavLink from "./NavLink";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="z-10 flex gap-5 py-2 pl-4 bg-orange-300 dark:bg-gray-900 bg-opacity-60 dark:bg-opacity-60 backdrop-blur fixed left-0 right-0">
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
          className={classNames("p-2", pathname === "/works" && "bg-teal-600")}
        >
          Works
        </NavLink>
        <NavLink
          href="/posts"
          className={classNames("p-2", pathname === "/posts" && "bg-teal-600")}
        >
          Posts
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
