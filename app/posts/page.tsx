import React from "react";

import Banner from "@/components/Banner";
import GridItem from "@/components/works/GridItem";

const posts = [
  {
    title: "Unveiling Web Accessibility: A Comprehensive Guide to WCAG and ARIA",
    url: "https://medium.com/@mertakca/unveiling-web-accessibility-a-comprehensive-guide-to-wcag-and-aria-1d7b62bf4e69",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IIJH_Z1o9YNFbKuJyZt7Ag.png",
  },
  {
    title: "Navigating the Web Design Landscape: Unveiling Graceful Degradation and Maximizing Efficiency",
    url: "https://medium.com/@mertakca/navigating-the-web-design-landscape-unveiling-graceful-degradation-and-maximizing-efficiency-8c3df274fec8",
    thumbnail: "https://miro.medium.com/v2/resize:fit:858/format:webp/0*ipuHiwK0NgemzXMV.png",
  },
  {
    title: "Elevating User Journeys: Design, Flow, and Feedback",
    url: "https://medium.com/@mertakca/elevating-user-journeys-design-flow-and-feedback-f4cb405491dd",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KwaHMAYP4dVEmlX7g5BLoA.jpeg",
  },
  {
    title: "Understanding Perceptual Issues in Web Design: Tips for Front-End Engineers",
    url: "https://medium.com/@mertakca/understanding-perceptual-issues-in-web-design-tips-for-front-end-engineers-24d0df52881a",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*RB6hoFLzwAa0-iaP",
  },
  {
    title: "Ten Practical Accessibility Tips Every Front-End Developer Should Know",
    url: "https://medium.com/@mertakca/ten-practical-accessibility-tips-every-front-end-developer-should-know-e24f1bc292ec",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QKcKKHnw38rF9ACzlDSHwg.jpeg",
  },
  {
    title: "Flutter Provider Architecture (🇹🇷)",
    url: "https://medium.com/@mertakca/flutter-provider-mimarisi-ded4f8fac9d",
    thumbnail: "/images/provider.png",
  },
  {
    title: "Flutter and Unit Testing (🇹🇷)",
    url: "https://medium.com/@mertakca/flutter-ve-unit-testing-7a4893a402fd",
    thumbnail: "/images/testing.png",
  },
  {
    title: "Developing an app with React Native and HMS Map (🇹🇷)",
    url: "https://medium.com/@mertakca/react-native-ve-hms-map-ile-harita-uygulamas%C4%B1-geli%C5%9Ftirme-1272bb3a6924",
    thumbnail: "/images/hms-app.png",
  },
  {
    title: "Created treasure Hunt for corporates",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6946382711762612225?utm_source=share&utm_medium=member_desktop",
    thumbnail: "/images/hunt.png",
  },
  {
    title: "Top 20 in International Flutter Hackathon 2020",
    url: "https://www.linkedin.com/posts/mertakca_flutter-hackathon-activity-6690610967375613953-OsHq?utm_source=share&utm_medium=member_desktop",
    thumbnail: "/images/hackaton.png",
  },
];

const PostsPage = () => {
  return (
    <>
      <h2 className="text-xl my-4">Posts</h2>
      <Banner emoji="👨‍💻">
        <small>
          It looks like I am a designer but actually I am a developer.
        </small>
      </Banner>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </>
  );
};

export default PostsPage;
