import React from "react";
import { Metadata } from "next";

import Article from "@/components/works/Article";

export const metadata: Metadata = {
  title: "Huawei Mobile Services - Mert AKCA",
};

const HuaweiPage = () => {
  return (
    <Article
      title="Huawei Mobile Services"
      year="2020"
      pills={[
        { label: "Website", value: "https://developer.huawei.com/" },
        {
          label: "GitHub",
          value: "https://github.com/HMS-Core/hms-react-native-plugin/",
        },
        { label: "Platform", value: "Android, React Native" },

        {
          label: "Stack",
          value: "React.js, TypeScript, React Native, Android Studio, Java",
        },
      ]}
      images={["/images/hms-map.jpg", "/images/hms-map2.png"]}
    >
      Huawei Mobile Services enables developers to integrate Huawei services
      like HMS Map, HMS Health, HMS Nearby, etc. HMS Services are available for
      React Native, Flutter, Ionic/Capacitor, Xamarin platforms for people to
      use.
    </Article>
  );
};

export default HuaweiPage;
