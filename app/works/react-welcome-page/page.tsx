import Article from "@/components/works/Article";
import React from "react";

const ReactLibraryPage = () => {
  return (
    <Article
      title="React Welcome Page"
      year="2018"
      pills={[
        {
          label: "NPM",
          value: "https://www.npmjs.com/package/react-welcome-page",
        },
        {
          label: "GitHub",
          value: "https://github.com/utarit/react-welcome-page",
        },
        {
          label: "Demo",
          value: "https://utarit.github.io/react-welcome-page-color-form",
        },
        {
          label: "Stack",
          value: "React, React Native, CSS",
        },
      ]}
      images={[
        "/images/react-welcome-page.gif",
        "/images/react-welcome-page-demo.png",
      ]}
    >
      Simple animated customizable welcome screen component that works for both
      React and React Native platforms.
    </Article>
  );
};

export default ReactLibraryPage;
