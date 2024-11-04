"use client";

import { useEffect, useRef } from "react";

export default function Feather() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const scrollHandler = () => {
      if (!videoRef.current) return;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = window.scrollY / maxScroll;
      const videoDuration = videoRef.current.duration;

      // Calculate the new time for the video based on scroll position
      const newTime = videoDuration * scrollFraction;

      // Update the video's current time
      videoRef.current.currentTime = newTime;
    };

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 h-full">
      <video className="w-full h-full object-cover" ref={videoRef}>
        <source src="/feather.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
