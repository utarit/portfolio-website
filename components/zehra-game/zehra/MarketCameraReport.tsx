"use client";

import React, { useState } from "react";
import Image from "next/image";

import Dialog from "../Dialog";
import PuzzleSection from "../helpers/PuzzleSection";
import PuzzleLock from "../PuzzleLock";

const MarketCameraReport = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <PuzzleSection className="row-start-2">
      <h2 className="text-xl ">
        3. Mahmut&apos;un dükkanı önünde yaşanan kaza hakkında aldığımız
        detaylar
      </h2>
      <p className="my-4">
        Ajanımız hastalık iznine çıkarken şifresini vermeyi unutmuş. Şifrelerini
        gizlemeyi çok iyi bilir, belki panosu sana yardımcı olur.
      </p>

      <Image
        src="/zehra/board-puzzle.png"
        width={800}
        height={800}
        alt="A cork board"
      />
      <PuzzleLock
        label="Kamera görüntüleri"
        placeholder="XXXXXXX"
        answer={/ala(c|ç|Ç)at(ı|i)/i}
        onPuzzleSolve={() => setIsDialogOpen(true)}
        hintText="Gazete haberini dikkatli okudunuz mu? Orijinal haberden biraz farklı gibi..."
        solutionText="Şifre: alaçatı"
      />
      {isDialogOpen && (
        <Dialog onClose={() => setIsDialogOpen(false)}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/zehra/mail.jpeg"
              width={800}
              height={400}
              alt="Mail from agents"
            />
            <Image
              src="/zehra/mail2.jpeg"
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
