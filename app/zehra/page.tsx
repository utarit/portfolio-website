import React from "react";
import classNames from "classnames";
import { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import ChestPuzzle from "@/components/zehra-game/zehra/ChestPuzzle";
import FinalChat from "@/components/zehra-game/zehra/FinalChat";
import HiddenMessages from "@/components/zehra-game/zehra/HiddenMessages";
import MarketCameraReport from "@/components/zehra-game/zehra/MarketCameraReport";

const ZehraPage = () => {
  return (
    <main className="pt-16">
      <div className="flex justify-center">
        <Image
          src="/zehra/zehra-is-missing.png"
          width={500}
          height={300}
          alt="Zehra game logo"
          className="rounded-lg"
        />
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
