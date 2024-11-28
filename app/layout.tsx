import { Analytics } from "@vercel/analytics/react";
import classNames from "classnames";
import type { Metadata } from "next";
import Script from "next/script";

import { documentFont, headingFont } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mert Akça - Front-end Developer & Game Creator",
  description:
    "Passionate front-end developer and game creator. Explore my projects, including the intriguing mystery game 'Zehra is Missing.'",
  icons: [
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: "Mert Akça - Front-end Developer & Game Creator",
    title: "Mert Akça - Front-end Developer & Game Creator",
    description:
      "Passionate front-end developer and game creator. Explore my projects, including the intriguing mystery game 'Zehra is Missing.",
    type: "website",
    url: "https://mertsdesk.top/",
    images: {
      url: "/cat-drinking.gif",
      type: "image/gif",
      alt: "Cat drinking coffee",
      height: "300",
      width: "300",
    },
  },
  alternates: {
    canonical: "https://mertsdesk.top/",
  },
  keywords: [
    "front-end developer",
    "game creator",
    "puzzle game",
    "mystery game",
    "Zehra is Missing",
    "Mert Akça",
    "problem-solving",
    "efficient solutions",
    "stylish solutions",
    "accessible solutions",
    "METU graduate",
    "caffeine addict",
    "short film director",
    "escape room enthusiast",
    "LinkedIn",
    "GitHub",
    "Medium",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={classNames(documentFont.variable, headingFont.variable)}
    >
      <head>
        <Script src="/theme.js" />
      </head>
      <body className="text-black bg-orange-100 dark:text-white dark:bg-gray-800">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
