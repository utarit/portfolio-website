import React from "react";

import { LanguageToggle } from "@/components/LanguageToggle";
import GameContent from "@/components/zehra-game/GameContent";
import { SocialBanner } from "@/components/zehra-game/SocialBanner";

const ZehraPage = () => {
  return (
    <main>
      <SocialBanner />
      <div className="flex flex-col justify-center items-center my-4 md:mb-0 gap-4">
        <LanguageToggle />
        <GameContent />
      </div>
    </main>
  );
};

export default ZehraPage;
