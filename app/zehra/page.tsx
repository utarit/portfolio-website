import React from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import GameContent from "@/components/zehra-game/GameContent";

const ZehraPage = () => {
  return (
    <main className="pt-20">
      <div className="flex flex-col justify-center items-center my-4 md:mb-0 gap-4">
        <LanguageToggle />
        <GameContent />
      </div>
    </main>
  );
};

export default ZehraPage;
