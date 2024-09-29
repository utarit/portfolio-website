"use client";

import { useState } from "react";
import Image from "next/image";

import Dialog from "../Dialog";
import PuzzleSection from "../helpers/PuzzleSection";
import PuzzleLock from "../PuzzleLock";

const ChestPuzzle = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <PuzzleSection>
      <h2 className="text-xl ">
        1. Zehra&apos;nın odasında bulunan bir sandık
      </h2>
      <p className="my-4">
        Uzmanlarımız şifrenin, Zehra&apos;nın sevdiği bir şey olduğnu düşünüyor.
      </p>
      <PuzzleLock
        label="Sandık şifresi"
        placeholder="XXXXXXXXX"
        answer={/k(u|ü|Ü)lked(ı|i|İ)s(ı|i|İ)/i}
        onPuzzleSolve={() => setIsDialogOpen(true)}
        hintText="Teyzesinin ifadesini dikkatli okuyun"
        solutionText="Şifre: külkedisi"
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
