import React from "react";
import { Metadata } from "next";

import Banner from "@/components/Banner";
import GridItem from "@/components/works/GridItem";

export const metadata: Metadata = {
  title: "Works - Mert AKCA",
};

const works = [
  {
    title: "HeyJobs",
    desc: "Find a better job with HeyJobs",
    url: "/heyjobs",
    thumbnail: "/images/heyjobs.svg",
  },
  {
    title: "Plentific",
    desc: "A simple work order management platform",
    url: "/plentific",
    thumbnail: "/images/plentific2.png",
  },
  {
    title: "Zehra is missing",
    desc: "A mystery-based game with interactive elements",
    url: "/crime-game",
    thumbnail: "/zehra/zehra-is-missing.png",
  },
  {
    title: "Huawei",
    desc: "Huawei services for React Native and JavaScript based platform",
    url: "/huawei",
    thumbnail: "/images/hms-map.jpg",
  },
];

const oldWorks = [
  {
    title: "VRThings",
    desc: "A Board Game Experience but with VR",
    url: "/vrthings",
    thumbnail: "/images/vrthings.png",
  },
  {
    title: "React Welcome Page",
    desc: "An open source npm package for both React Web and React Native",
    url: "/react-welcome-page",
    thumbnail: "/images/react-welcome-page-demo.png",
  },
  {
    title: "OCİT First Aid",
    desc: "A First aid app that guides people in emergencies",
    url: "/ocit",
    thumbnail: "/images/ocit.png",
  },
  {
    title: "UniKit",
    desc: "A handy app for METU students",
    url: "/unikit",
    thumbnail: "/images/unikit.png",
  },
];
const WorksPage = () => {
  return (
    <>
      <h2 className="text-xl my-4">Works</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((el) => (
          <GridItem
            key={el.url}
            url={"/works" + el.url}
            title={el.title}
            description={el.desc}
            thumbnail={el.thumbnail}
          />
        ))}
      </ul>
      <hr className="my-6 h-0.5 border-t-0 bg-neutral-800 dark:bg-neutral-100 opacity-100 dark:opacity-50" />
      <h2 className="text-xl my-4">Old Works (young and student times)</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {oldWorks.map((el) => (
          <GridItem
            key={el.url}
            url={"/works" + el.url}
            title={el.title}
            description={el.desc}
            thumbnail={el.thumbnail}
          />
        ))}
      </ul>
    </>
  );
};

export default WorksPage;
