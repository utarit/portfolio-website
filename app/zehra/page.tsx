import React from "react";
import Image from "next/image";
import Link from "next/link";

import ChestPuzzle from "@/components/zehra-game/zehra/ChestPuzzle";
import FinalChat from "@/components/zehra-game/zehra/FinalChat";
import HiddenMessages from "@/components/zehra-game/zehra/HiddenMessages";
import MarketCameraReport from "@/components/zehra-game/zehra/MarketCameraReport";
import { Button } from "@/design-system/Button";

const ZehraPage = () => {
  return (
    <main className="pt-20">
      <div className="flex flex-col justify-center items-center mb-4 md:mb-0 gap-4">
        <Image
          src="/zehra/zehra-is-missing.png"
          width={500}
          height={300}
          alt="Zehra game logo"
          className="md:rounded-lg"
        />
        <Button href="https://drive.google.com/file/d/12aS9ZrRgljpcJc7dA24GsyUc2vC1-bBK/view">
          Oyun PDF
        </Button>
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
