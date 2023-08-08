import React from "react";
import { Metadata } from "next";

import Banner from "@/components/Banner";
import Article from "@/components/works/Article";

export const metadata: Metadata = {
  title: "UniKit - Mert AKCA",
};

const UnikitPage = () => {
  return (
    <Article
      title="UniKit - Buddy for METU Students"
      year="2019"
      pills={[
        {
          label: "App Store",
          value:
            "https://play.google.com/store/apps/details?id=com.maks.metu_buddy",
        },
        {
          label: "GitHub",
          value: "https://github.com/utarit/metu_buddy",
        },
        {
          label: "Platform",
          value: "Android",
        },
        {
          label: "Stack",
          value: "Flutter, Dart",
        },
      ]}
      images={["/images/unikit.png", "/images/unikit2.png"]}
    >
      <p>
        UniKit is an app designed to assist students in managing their school
        life as efficiently as possible. UniKit communicates with the
        school&apos;s information system and utilizes a local database to store
        courses and to-do data.
      </p>
      <Banner emoji="🦠">
        <small>
          Right after it was released, the Covid-19 outbreak occurred, leading
          everyone to stay at home.
        </small>
      </Banner>
    </Article>
  );
};

export default UnikitPage;
