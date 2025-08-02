"use client";

import { useEffect, useRef, useState } from "react";
import ButtonComponent from "./Button";

export const Trust = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          const playPromise = videoRef.current?.play();
          if (playPromise) {
            playPromise.catch((e) => console.warn("Video play failed:", e));
          }
          setHasPlayed(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <section
      ref={sectionRef}
      className="pt-12 md:pt-0 px-4 sm:px-0 relative overflow-hidden bg-[#f3ece1] rounded-3xl"
    >
      <div className="mx-auto w-full">
        <div className="overflow-hidden">
          <div className="text-center px-6 py-12 md:absolute w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-general-black mb-6 max-w-5xl mx-auto">
              We focus on the overlooked but vital health needs of African women
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-body-text-gray mb-8 max-w-2xl mx-auto">
              Whether you're managing pain, planning a family, or just not
              feeling like yourself, we are here to help.
            </p>
            <ButtonComponent />
          </div>

          <div className="w-full aspect-video overflow-hidden -mb-1">
            <video
              ref={videoRef}
              className="w-full h-full object-cover border-none outline-none"
              muted={true}
              autoPlay={true}
              playsInline={true}
              preload="auto"
            >
              <source src="/images/pills_animation_3.mp4" type="video/mp4" />
              <source src="/images/pills_animation_3.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
