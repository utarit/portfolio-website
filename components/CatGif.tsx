import React from "react";
import Image from "next/image";

const CatGif = () => {
  return (
    <aside className="flex justify-center items-center">
      <Image
        className="dark:invert"
        src="/cat-drinking.gif"
        alt="Cat drinking coffee"
        width={300}
        height={300}
      />
    </aside>
  );
};

export default CatGif;
