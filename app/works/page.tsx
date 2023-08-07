import GridItem from "@/components/works/GridItem";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mert AKCA - Works",
};

const works = [
  {
    title: "Plentific",
    desc: "A simple work order management platform",
    url: "/plentific",
    thumbnail: "/images/plentific2.png",
  },
  {
    title: "Secret Hunters",
    desc: "A mystery-based game series with interactive elements",
    url: "/secret-hunters",
    thumbnail: "/images/plentific2.png",
  },
  {
    title: "Huawei",
    desc: "Huawei services for react native and Javascript based platform",
    url: "/huawei",
    thumbnail: "/images/hms-map.jpg",
  },
  {
    title: "UniKit",
    desc: "A handy app for METU students",
    url: "/unikit",
    thumbnail: "/images/unikit.png",
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
    title: "OCİT Blog",
    desc: "METU Lifesaving and First Aid Society Blog",
    url: "/ocit-blog",
    thumbnail: "/images/ocit-blog.png",
  },
];
const WorksPage = () => {
  return (
    <main>
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
      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <h2 className="text-xl my-4">Old Works</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </main>
  );
};

export default WorksPage;
