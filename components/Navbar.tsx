"use client";

import React from "react";
import classNames from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/design-system/Button";

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

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="z-10 flex justify-between gap-5 py-4 px-4 bg-background-200 bg-opacity-60 backdrop-blur fixed left-0 right-0">
      <Button
        href="/"
        variant="text"
        size="md"
        className="group flex gap-3 items-center"
      >
        <Image
          className="group-hover:rotate-[20deg] dark:invert"
          src="/images/footprint.png"
          height={24}
          width={24}
          alt="logo"
        />
        <h1>Mert&apos;s Desktop</h1>
      </Button>

      <nav className="hidden md:flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.path}
            href={tab.path}
            variant="text"
            size="md"
            className={classNames(
              pathname.includes(tab.path) && "bg-background-300",
            )}
          >
            {tab.label}
          </Button>
        ))}
      </nav>

      <Button
        className="md:hidden"
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        variant="text"
      >
        <HamburgerButton />
      </Button>

      {isMenuOpen && (
        <nav className="fixed right-4 top-12 flex flex-col bg-orange-300 dark:bg-gray-900 rounded-md">
          {tabs.map((tab) => (
            <Button
              key={tab.path}
              href={tab.path}
              variant="text"
              size="md"
              className={classNames(
                "rounded-none",
                pathname.includes(tab.path) && "bg-primary-100",
              )}
            >
              {tab.label}
            </Button>
          ))}
        </nav>
      )}
    </header>
  );
};

const HamburgerButton: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 18H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Navbar;
