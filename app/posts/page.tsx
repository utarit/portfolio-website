import React from "react";

import Banner from "@/components/Banner";
import GridItem from "@/components/works/GridItem";

const posts = [
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
    <main>
      <h2 className="text-xl my-4">Posts</h2>
      <Banner emoji="📰">
        <small>
          I actually wrote these articles for another blog site as a volunteer
          technical writer. They suddenly closed and I had to get my articles
          from web arcives. I only got some of them.
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
    </main>
  );
};

export default PostsPage;
