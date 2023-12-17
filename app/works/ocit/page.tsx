import React from "react";
import { Metadata } from "next";

import Banner from "@/components/Banner";
import Article from "@/components/works/Article";

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
      <p>
        Leveraging my extensive knowledge in first aid, I developed an app to
        help increase public awareness and assist people in emergency
        situations. The app includes GIFs demonstrating step-by-step procedures
        and a blog section powered by Firebase for additional information.
      </p>
      <Banner emoji="💻">
        <small>
          I wrote the whole app twice, first time with Flutter, second time with
          Capacitor. It is important to back up things, you know...
        </small>
      </Banner>
    </Article>
  );
};

export default OcitPage;
