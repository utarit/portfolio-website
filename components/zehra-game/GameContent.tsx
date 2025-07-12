"use client";

import React from "react";
import Image from "next/image";

import ChestPuzzle from "@/components/zehra-game/zehra/ChestPuzzle";
import FinalChat from "@/components/zehra-game/zehra/FinalChat";
import HiddenMessages from "@/components/zehra-game/zehra/HiddenMessages";
import MarketCameraReport from "@/components/zehra-game/zehra/MarketCameraReport";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";

const GameContent = () => {
  const { t } = useLanguage();

  return (
    <>
      <Image
        src="/zehra/zehra-is-missing.png"
        width={500}
        height={300}
        alt={t("gameTitle")}
        className="md:rounded-lg"
      />
      <Button href={t("pdfLink")} target="_blank">
        {t("gamePdf")}
      </Button>

      <div className="flex flex-col md:p-4 md:grid md:grid-cols-2 gap-4 w-full">
        <ChestPuzzle />
        <HiddenMessages />
        <MarketCameraReport />
      </div>
      <FinalChat />
    </>
  );
};

export default GameContent;
