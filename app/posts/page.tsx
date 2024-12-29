import React from "react";

import Banner from "@/components/Banner";
import { MainLayout } from "@/components/layout/main-layout";
import GridItem from "@/components/works/GridItem";

const posts = [
  {
    title:
      "Navigating the European Accessibility Act: Developer’s Guide to Inclusive Web",
    url: "https://medium.com/heyjobs-tech/navigating-the-european-accessibility-act-developers-guide-to-inclusive-web-bcfb0ee68bfd?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*4_4UV-EZ4kZANMR5-hTdUA.jpeg",
  },
  {
    title: "HCI Part 3: How We Remember and Why it Matters for Design — Memory",
    url: "https://medium.com/heyjobs-tech/hci-part-3-how-we-remember-and-why-it-matters-for-design-memory-6e3dba904356?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-kLeeScOxY_z8WJIL-mpRw.jpeg",
  },
  {
    title: "HCI Part 2: The Perfect Harmony for UI/UX Design — Vision & Sound",
    url: "https://medium.com/heyjobs-tech/hci-part-2-the-perfect-harmony-for-ui-ux-design-vision-sound-c3a67dec207d?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ZqPVGTn366wjZ2jrHVg3NQ.jpeg",
  },
  {
    title: "HCI Part 1: The Underrated Sense Shaping Our Interactions — Touch",
    url: "https://medium.com/heyjobs-tech/hci-part-1-the-underrated-sense-shaping-our-interactions-touch-ce97a8773a67?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*CtkvMTCvkW-Os2EBoXJtkw.jpeg",
  },
  {
    title: "CSS Only: How to create a blurred background for your image",
    url: "https://medium.com/@mertakca/css-only-how-to-create-a-blurred-background-for-your-image-1615f57792c0?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:720/format:webp/1*AKH9qZXKNXLy6zwPoyE9qg.png",
  },
  {
    title:
      "Unveiling Web Accessibility: A Comprehensive Guide to WCAG and ARIA",
    url: "https://medium.com/@mertakca/unveiling-web-accessibility-a-comprehensive-guide-to-wcag-and-aria-1d7b62bf4e69?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IIJH_Z1o9YNFbKuJyZt7Ag.png",
  },
  {
    title: "Unveiling Graceful Degradation and Maximizing Efficiency",
    url: "https://medium.com/@mertakca/navigating-the-web-design-landscape-unveiling-graceful-degradation-and-maximizing-efficiency-8c3df274fec8?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:858/format:webp/0*ipuHiwK0NgemzXMV.png",
  },
  {
    title: "Elevating User Journeys: Design, Flow, and Feedback",
    url: "https://medium.com/@mertakca/elevating-user-journeys-design-flow-and-feedback-f4cb405491dd?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KwaHMAYP4dVEmlX7g5BLoA.jpeg",
  },
  {
    title:
      "Understanding Perceptual Issues in Web Design: Tips for Front-End Engineers",
    url: "https://medium.com/@mertakca/understanding-perceptual-issues-in-web-design-tips-for-front-end-engineers-24d0df52881a?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*RB6hoFLzwAa0-iaP",
  },
  {
    title:
      "Ten Practical Accessibility Tips Every Front-End Developer Should Know",
    url: "https://medium.com/@mertakca/ten-practical-accessibility-tips-every-front-end-developer-should-know-e24f1bc292ec?utm_source=portfolio",
    thumbnail:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QKcKKHnw38rF9ACzlDSHwg.jpeg",
  },
  {
    title: "Flutter Provider Architecture (🇹🇷)",
    url: "https://medium.com/@mertakca/flutter-provider-mimarisi-ded4f8fac9d?utm_source=portfolio",
    thumbnail: "/images/provider.png",
  },
  {
    title: "Flutter and Unit Testing (🇹🇷)",
    url: "https://medium.com/@mertakca/flutter-ve-unit-testing-7a4893a402fd?utm_source=portfolio",
    thumbnail: "/images/testing.png",
  },
  {
    title: "Developing an app with React Native and HMS Map (🇹🇷)",
    url: "https://medium.com/@mertakca/react-native-ve-hms-map-ile-harita-uygulamas%C4%B1-geli%C5%9Ftirme-1272bb3a6924?utm_source=portfolio",
    thumbnail: "/images/hms-app.png",
  },
  {
    title: "Created treasure Hunt for cooperates",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6946382711762612225?utm_source=portfolio",
    thumbnail: "/images/hunt.png",
  },
  {
    title: "Top 20 in International Flutter Hackathon 2020",
    url: "https://www.linkedin.com/posts/mertakca_flutter-hackathon-activity-6690610967375613953-OsHq?utm_source=portfolio",
    thumbnail: "/images/hackaton.png",
  },
];

const PostsPage = () => {
  return (
    <MainLayout>
      <h2 className="text-xl my-4">Posts</h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {posts.map((el) => (
          <GridItem
            key={el.url}
            url={el.url}
            description={el.title}
            thumbnail={el.thumbnail}
            blank
          />
        ))}
      </ul>
    </MainLayout>
  );
};

export default PostsPage;
