import React from "react";
import Image from "next/image";

const CatGif = () => {
  return (
    <aside className="flex justify-center items-center pt-8">
      <Image
        className="dark:invert"
        src="/cat-drinking.gif"
        alt="Cat drinking coffee"
        width={300}
        height={300}
        priority
      />
    </aside>
  );
};

export default CatGif;
