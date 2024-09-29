import React from "react";
import classNames from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const PuzzleSection = ({ children, className }: Props) => {
  return (
    <section
      className={classNames(
        "p-4 bg-orange-300 dark:bg-gray-900 md:rounded-lg",
        className
      )}
    >
      {children}
    </section>
  );
};

export default PuzzleSection;
