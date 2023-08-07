import Article from "@/components/works/Article";
import React from "react";

const HuaweiPage = () => {
  return (
    <Article
      title="HMS Map Kit"
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
      React Native Map Plugin enables users to use native map services in their
      React Native apps.
    </Article>
  );
};

export default HuaweiPage;
