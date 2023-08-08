import Article from "@/components/works/Article";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secret Hunters - Mert AKCA",
};

const SecretHuntersPage = () => {
  return (
    <Article
      title="Secret Hunters"
      year="2023"
      pills={[
        {
          label: "Website",
          value: "https://secrethunters.co",
        },
        {
          label: "Platform",
          value: "Printible, Web",
        },
        {
          label: "Stack",
          value: "Creativity, Music, Google Docs, Next.js, Tailwind CSS",
        },
      ]}
      images={["/images/cork-board.png"]}
    >
      Proudly, I am the founder of Secret Hunters which is a mystery solving
      game series with both printed and interactive elements. Only one game
      (with only Turkish language for now) is out now, translations and the rest
      of the series is under development.
    </Article>
  );
};

export default SecretHuntersPage;
