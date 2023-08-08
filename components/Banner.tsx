import React from "react";

type Props = {
  children: React.ReactNode;
  emoji?: string;
};

const Banner = ({ children, emoji = "😱" }: Props) => {
  return (
    <aside className="bg-orange-200 dark:bg-gray-900 p-4 flex items-center justify-between gap-2 my-2">
      {children}
      <p className="relative">
        <span className="absolute animate-ping">{emoji}</span>
        {emoji}
      </p>
    </aside>
  );
};

export default Banner;
