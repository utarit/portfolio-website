"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/design-system/Button";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2 mb-4">
      <Button
        variant={language === "en" ? "contained" : "text"}
        color="primary"
        onClick={() => setLanguage("en")}
        size="sm"
      >
        {t("language.english")}
      </Button>
      <Button
        variant={language === "tr" ? "contained" : "text"}
        color="primary"
        onClick={() => setLanguage("tr")}
        size="sm"
      >
        {t("language.turkish")}
      </Button>
    </div>
  );
}
