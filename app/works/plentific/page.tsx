import Article from "@/components/works/Article";
import React from "react";

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
          value: "React.js, TypeScript, React Query, Stroybook",
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
