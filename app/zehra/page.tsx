import React from "react";
import Image from "next/image";
import Link from "next/link";

import ChestPuzzle from "@/components/zehra-game/zehra/ChestPuzzle";
import FinalChat from "@/components/zehra-game/zehra/FinalChat";
import HiddenMessages from "@/components/zehra-game/zehra/HiddenMessages";
import MarketCameraReport from "@/components/zehra-game/zehra/MarketCameraReport";

const ZehraPage = () => {
  return (
    <main className="pt-20">
      <div className="flex flex-col justify-center items-center mb-4 md:mb-0">
        <Image
          src="/zehra/zehra-is-missing.png"
          width={500}
          height={300}
          alt="Zehra game logo"
          className="md:rounded-lg"
        />
        <Link
          href="https://drive.google.com/file/d/12aS9ZrRgljpcJc7dA24GsyUc2vC1-bBK/view"
          className="bg-teal-600 dark:bg-teal-400 hover:bg-teal-500 active:bg-teal-600 text-white dark:text-black mt-4 px-4 py-2 rounded-md font-semibold "
        >
          Oyun PDF
        </Link>
      </div>

      <div className="flex flex-col md:p-4 md:grid md:grid-cols-2 gap-4">
        <ChestPuzzle />

        <HiddenMessages />

        <MarketCameraReport />
      </div>
      <FinalChat />
    </main>
  );
};

export default ZehraPage;
