import { Metadata } from "next";

import ZehraGamePage from "../page";

export const metadata: Metadata = {
  title:
    "Zehra Kayıp · Dedektiflik Deneyimi · Senaryo Tabanlı Sürükleyici Oyunlar",
  description:
    "Gerilim dolu suç çözme oyunuyla sırları çözün, dedektif yeteneklerinizi sınayın. Aile eğlencesi ve stratejik oyun için mükemmel bir deneyim!",
  keywords:
    "suç çözme oyunu, dedektif oyunu, masa oyunu, gizem, macera, bulmaca, aile oyunu, stratejik oyun, masa oyunu, Türkçe",
  openGraph: {
    title: "Zehra Kayıp - Suç Çözme İnteraktif Oyun",
    description:
      "Sürükleyici bir suç çözme oyunu ile gerilim dolu dünyayı keşfedin. Sırları çözün, dedektif yeteneklerinizi sınayın ve heyecan verici bir oyun deneyiminin tadını çıkarın. Aile eğlencesi ve stratejik oyun için mükemmel.",
    url: "https://mertsdesk.top/zehra/tr",
    siteName: "Mert's Desktop",
    images: ["/zehra-missing.jpeg"],
  },
};

// Re-export the main page component
export default ZehraGamePage;
