import React from "react";
import { Metadata } from "next";

import Article from "@/components/works/Article";

export const metadata: Metadata = {
  title: "HeyJobs - Mert's Desktop",
};

const HeyJobsPage = () => {
  return (
    <Article
      title="HeyJobs"
      year="2023"
      pills={[
        {
          label: "Website",
          value: "https://www.heyjobs.co/",
        },
        {
          label: "Platform",
          value: "Web",
        },
        {
          label: "Stack",
          value:
            "React.js, TypeScript, Next.js, Storybook, MUI, Growthbook, Ruby on Rails, PostgreSQL, Docker, CircleCI",
        },
      ]}
      images={["/images/heyjobs.svg"]}
    >
      Our purpose at HeyJobs is to enable everyone to find the right job to live
      a fulfilling life.

      To achieve this, we aim to build the fastest growing talent platform in
      Europe, leveraging Machine Learning algorithms 🧠, cutting-edge technology
      🚀 and performance marketing 📊 to perfectly match talent and jobs.
    </Article>
  );
};

export default HeyJobsPage;
