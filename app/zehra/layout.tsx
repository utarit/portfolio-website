import { Metadata } from "next";
import { Kanit } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";

const kanit = Kanit({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Zehra is Missing · Detective Experience · Interactive Crime Solving Game",
  description:
    "Solve thrilling crime puzzles, test your detective skills. Perfect for family fun and strategic gameplay!",
  keywords:
    "crime solving game, detective game, board game, mystery, adventure, puzzle, family game, strategic game, English",
  twitter: {
    title: "Zehra is Missing - Interactive Crime Solving Game",
    description:
      "Discover the thrilling world with an immersive crime solving game. Solve secrets, test your detective skills and enjoy an exciting gaming experience. Perfect for family entertainment and strategic gameplay.",
    site: "https://mertsdesk.top/zehra",
    images: ["/zehra-missing.jpeg"],
    card: "summary_large_image",
  },
  openGraph: {
    type: "website",
    title: "Zehra is Missing - Interactive Crime Solving Game",
    description:
      "Discover the thrilling world with an immersive crime solving game. Solve secrets, test your detective skills and enjoy an exciting gaming experience. Perfect for family entertainment and strategic gameplay.",
    url: "https://mertsdesk.top/zehra",
    siteName: "Mert's Desktop",
    images: ["/zehra-missing.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
