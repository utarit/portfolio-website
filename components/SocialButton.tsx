import React from "react";
import classNames from "classnames";
import Link from "next/link";

import { Button } from "@/design-system/Button";

type Props = {
  children: React.ReactNode;
  href: string;
};

const SocialButton = ({ children, href }: Props) => {
  return (
    <Button
      target="_blank"
      variant="text"
      href={href}
    >
      {children}
    </Button>
  );
};

export default SocialButton;
