import { Analytics } from "@vercel/analytics/react";
import classNames from "classnames";
import type { Metadata } from "next";
import Script from "next/script";

import { documentFont, headingFont } from "./fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Potfolio - Mert AKCA",
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
