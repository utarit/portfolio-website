import Link from "next/link";
import React, { ComponentProps } from "react";

const NavLink = (props: ComponentProps<typeof Link>) => {
  return (
    <Link className="hover:underline underline-offset-4" {...props}>
      {props.children}
    </Link>
  );
};

export default NavLink;
