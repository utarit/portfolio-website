import React, { ComponentProps } from "react";
import Link from "next/link";

const NavLink = (props: ComponentProps<typeof Link>) => {
  return (
    <Link className="hover:underline underline-offset-4" {...props}>
      {props.children}
    </Link>
  );
};

export default NavLink;
