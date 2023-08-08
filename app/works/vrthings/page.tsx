import Article from "@/components/works/Article";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "VRThings - Mert AKCA",
};

const VrthingsPage = () => {
  return (
    <Article
      title="VRThings - Board game platform in VR"
      year="2020"
      pills={[
        {
          label: "Website",
          value: "https://senior.ceng.metu.edu.tr/2020/vrthings",
        },
        {
          label: "Video",
          value: "https://www.youtube.com/watch?v=o9STC2rdFmE",
        },
        {
          label: "Platform",
          value: "Oculus, Windows",
        },
        {
          label: "Stack",
          value: "Unity, C#, Oculus API",
        },
      ]}
      images={["/images/vrthings.png"]}
    >
      VRThings is a board game platform for VR devices that brings enthusiasts
      and distant friends together through cutting-edge virtual reality. Enjoy
      realistic environments and multiplayer support, play various games with 2
      to 6 people, and experience it all with your Oculus Quest wireless headset
      and VR controllers.
    </Article>
  );
};

export default VrthingsPage;
