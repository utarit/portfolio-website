import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import CatGif from "@/components/CatGif";

export const metadata: Metadata = {
  title: "Mert AKCA - Potfolio",
  description: "Some works and posts by Mert Akça's hand, and a cute cat.",
  icons: [
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: "Mert Akca's Portfolio",
    title: "Mert Akca's Portfolio",
    description: "Some works and posts by Mert Akça's hand, and a cute cat.",
    type: "website",
    url: "https://mertakca.live",
    images: {
      url: "/cat-drinking.gif",
      type: "image/gif",
      alt: "Cat drinking coffee",
      height: "300",
      width: "300",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="container max-w-xl mx-auto px-4">
        <Navbar />
        <CatGif />
        {children}
      </body>
    </html>
  );
}
