import Article from "@/components/works/Article";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "OCİT First Aid App - Mert AKCA",
};

const OcitPage = () => {
  return (
    <Article
      title="OCİT First Aid App"
      year="2018"
      pills={[
        {
          label: "Store",
          value:
            "https://play.google.com/store/apps/details?id=com.maks.ocitfirstaid",
        },
        {
          label: "Web",
          value: "https://ocit-canki.netlify.app/",
        },
        {
          label: "Platform",
          value: "Android, Web",
        },
        {
          label: "Stack",
          value: "Flutter, Android, Capacitor, Next.js, Firebase, Tailwind CSS",
        },
      ]}
      images={["/images/ocit.png"]}
    >
      Leveraging my extensive knowledge in first aid, I developed an app to help
      increase public awareness and assist people in emergency situations. The
      app includes gifs demonstrating step-by-step procedures and a blog section
      powered by Firebase for additional information.
    </Article>
  );
};

export default OcitPage;
