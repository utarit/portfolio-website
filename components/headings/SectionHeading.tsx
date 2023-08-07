import classNames from "classnames";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const SectionHeading = ({ children, className }: Props) => {
  return (
    <h3
      className={classNames(
        "text-xl underline underline-offset-4 my-3 decoration-zinc-600 decoration-4",
        className
      )}
    >
      {children}
    </h3>
  );
};

export default SectionHeading;
