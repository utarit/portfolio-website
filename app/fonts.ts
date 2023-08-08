import { Rubik, Varela_Round } from "next/font/google";

export const headingFont = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const documentFont = Rubik({
  subsets: ["latin"],
  variable: "--font-document",
  display: "swap",
});
