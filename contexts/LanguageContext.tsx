"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { Language, translations } from "@/lib/translations/zehra";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine initial language from URL
  const getInitialLanguage = useCallback((): Language => {
    if (pathname.endsWith("/tr")) {
      return "tr";
    }
    return "en"; // Default to English
  }, [pathname]);

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);

    // Update URL based on language
    if (lang === "tr") {
      // If switching to Turkish, add /tr suffix
      if (!pathname.endsWith("/tr")) {
        router.push(`${pathname}/tr`);
      }
    } else {
      // If switching to English, remove /tr suffix
      if (pathname.endsWith("/tr")) {
        router.push(pathname.replace("/tr", ""));
      }
    }
  };

  // Update language when pathname changes
  useEffect(() => {
    const newLanguage = getInitialLanguage();
    if (newLanguage !== language) {
      setLanguageState(newLanguage);
    }
  }, [pathname, language, getInitialLanguage]);

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
