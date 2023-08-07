import Link from "next/link";
import React from "react";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  href: string;
};

const SocialButton = ({ children, href }: Props) => {
  return (
    <Link
      target="_blank"
      className={classNames(
        "py-2 px-4 inline-block rounded-md font-semibold",
        `text-teal-700 dark:text-teal-300 hover:bg-teal-500 hover:bg-opacity-20 active:bg-opacity-40`
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default SocialButton;
