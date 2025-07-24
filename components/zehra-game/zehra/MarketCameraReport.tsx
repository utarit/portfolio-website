"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useLanguage } from "@/contexts/LanguageContext";

import Dialog from "../Dialog";
import PuzzleSection from "../helpers/PuzzleSection";
import PuzzleLock from "../PuzzleLock";

const MarketCameraReport = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t, language } = useLanguage();

  const boardPuzzleImage = language === "tr"
    ? "/zehra/cork-board-tr.png"
    : "/zehra/cork-board-en.png";

  const mailImage = language === "tr"
    ? "/zehra/mail-tr.png"
    : "/zehra/mail-en.png";

  return (
    <PuzzleSection className="row-start-2">
      <h2 className="text-xl ">
        {t("cameraReport.title")}
      </h2>
      <p className="my-4">
        {t("cameraReport.description")}
      </p>

      <Image
        src={boardPuzzleImage}
        width={800}
        height={800}
        alt="A cork board"
      />
      <PuzzleLock
        label={t("cameraReport.label")}
        placeholder={t("cameraReport.placeholder")}
        answer={/(c|ç|Ç|C)esme/i}
        onPuzzleSolve={() => setIsDialogOpen(true)}
        hintText={t("cameraReport.hint")}
        solutionText={t("cameraReport.solution")}
      />
      {isDialogOpen && (
        <Dialog onClose={() => setIsDialogOpen(false)}>
          <div className="flex flex-col gap-4 p-4 h-full md:h-[600px] overflow-auto">
            <Image
              src={mailImage}
              width={800}
              height={400}
              alt="Mail from agents"
            />

            <Image
              src="/zehra/hoodie.jpeg"
              width={500}
              height={500}
              alt="A security footage"
            />
          </div>
        </Dialog>
      )}
    </PuzzleSection>
  );
};

export default MarketCameraReport;
