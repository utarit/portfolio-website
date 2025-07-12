"use client";

import { useState } from "react";
import Image from "next/image";

import { useLanguage } from "@/contexts/LanguageContext";

import Dialog from "../Dialog";
import PuzzleSection from "../helpers/PuzzleSection";
import PuzzleLock from "../PuzzleLock";

const ChestPuzzle = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <PuzzleSection>
      <h2 className="text-xl ">
        {t("chestPuzzle.title")}
      </h2>
      <p className="my-4">
        {t("chestPuzzle.description")}
      </p>
      <PuzzleLock
        label={t("chestPuzzle.label")}
        placeholder={t("chestPuzzle.placeholder")}
        answer={/k(u|ü|Ü)lked(ı|i|İ)s(ı|i|İ)|cinderella/i}
        onPuzzleSolve={() => setIsDialogOpen(true)}
        hintText={t("chestPuzzle.hint")}
        solutionText={t("chestPuzzle.solution")}
      />
      {isDialogOpen && (
        <Dialog onClose={() => setIsDialogOpen(false)}>
          <div className="flex justify-center">
            <Image
              src="/zehra/chest.png"
              width={500}
              height={500}
              alt="Chest with a baby ultrasound inside"
            />
          </div>
        </Dialog>
      )}
    </PuzzleSection>
  );
};

export default ChestPuzzle;
