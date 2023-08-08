import Article from "@/components/works/Article";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Plentific - Mert AKCA",
};

const PlentificPage = () => {
  return (
    <Article
      title="Plentific"
      year="2021"
      pills={[
        {
          label: "Website",
          value: "https://www.plentific.com/",
        },
        {
          label: "Platform",
          value: "Web",
        },
        {
          label: "Stack",
          value: "React.js, TypeScript, React Query, Storybook, MUI, CI/CD",
        },
      ]}
      images={["/images/plentific.png", "/images/plentific2.png"]}
    >
      Plentific empowers landlords and property managers to deliver repairs,
      compliance, voids and resident services through a simple work order
      management platform and a network of trade professionals.
    </Article>
  );
};

export default PlentificPage;
