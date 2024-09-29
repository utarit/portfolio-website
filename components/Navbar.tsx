"use client";

import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavLink from "./NavLink";

const tabs = [
  {
    label: "Works",
    path: "/works",
  },
  {
    label: "Posts",
    path: "/posts",
  },
  {
    label: "Contact",
    path: "/contact",
  },
  {
    label: "Zehra is Missing",
    path: "/zehra",
  },
];

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
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            href={tab.path}
            className={classNames(
              "p-2",
              pathname === tab.path && "bg-teal-500"
            )}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
