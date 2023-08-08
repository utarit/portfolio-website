import React from "react";
import { Metadata } from "next";

import Article from "@/components/works/Article";

export const metadata: Metadata = {
  title: "OCİT Blog - Mert AKCA",
};

const OcitBlogPage = () => {
  return (
    <Article
      title="OCİT Blog"
      year="2021"
      pills={[
        {
          label: "Website",
          value: "https://ocit.vercel.app",
        },
        {
          label: "Platform",
          value: "Web",
        },
        {
          label: "Stack",
          value: "React, TypeScript, Next.js, Tailwind CSS, GraphQL, GraphCMS",
        },
      ]}
      images={["/images/ocit-blog.png", "/images/ocit-blog2.png"]}
    >
      Official website of METU Lifesaving and First Aid Society. People can read
      the latest news, get to know us and can comment on the blog posts.
    </Article>
  );
};

export default OcitBlogPage;
