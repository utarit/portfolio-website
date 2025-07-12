import { Metadata } from "next";

import FinalDecisionPage from "../page";

export const metadata: Metadata = {
  title: "Son Karar · Zehra Kayıp · Dedektiflik Deneyimi · Suç Çözme Oyunu",
  description:
    "Zehra Kayıp oyununda son kararınızı verin. Dedektif olarak topladığınız ipuçlarına dayanarak kim suçlu karar verin.",
  keywords:
    "son karar, zehra kayıp, suç çözme oyunu, dedektif oyunu, masa oyunu, gizem, macera, bulmaca, aile oyunu, stratejik oyun, Türkçe",
  openGraph: {
    title: "Son Karar - Zehra Kayıp Suç Çözme Oyunu",
    description:
      "Zehra Kayıp oyununda son kararınızı verin. Dedektif olarak topladığınız ipuçlarına dayanarak kim suçlu karar verin.",
    url: "https://mertsdesk.top/zehra/final-decision/tr",
    siteName: "Mert's Desktop",
    images: ["/zehra-missing.jpeg"],
  },
};

// Re-export the main page component
export default FinalDecisionPage;
