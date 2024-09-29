import { Metadata } from "next";
import { Kanit } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const kanit = Kanit({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Zehra is Missing · Dedektiflik Deneyimi · Senaryo Tabanlı Sürükleyici Oyunlar",
  description:
    "Gerilim dolu suç çözme oyunuyla sırları çözün, dedektif yeteneklerinizi sınayın. Aile eğlencesi ve stratejik oyun için mükemmel bir deneyim!",
  keywords:
    "suç çözme oyunu, dedektif oyunu, masa oyunu, gizem, macera, bulmaca, aile oyunu, stratejik oyun, masa oyunu, Türkçe",
  twitter: {
    title: "Zehra is Missing - Suç Çözme İnteraktif Oyun",
    description:
      "Sürükleyici bir suç çözme oyunu ile gerilim dolu dünyayı keşfedin. Sırları çözün, dedektif yeteneklerinizi sınayın ve heyecan verici bir oyun deneyiminin tadını çıkarın. Aile eğlencesi ve stratejik oyun için mükemmel.",
    site: "https://mertsdesk.top/zehra",
    images: ["/zehra-missing.jpeg"],
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    title: "Zehra is Missing - Suç Çözme İnteraktif Oyun",
    description:
      "Sürükleyici bir suç çözme oyunu ile gerilim dolu dünyayı keşfedin. Sırları çözün, dedektif yeteneklerinizi sınayın ve heyecan verici bir oyun deneyiminin tadını çıkarın. Aile eğlencesi ve stratejik oyun için mükemmel.",
    url: "https://mertsdesk.top/zehra",
    siteName: "Mert Akca's Desktop",
    images: ["/zehra-missing.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
