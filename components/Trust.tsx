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
      {
        threshold: 0.5, 
      }
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
      className="relative h-[110vh] overflow-hidden rounded-3xl "
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/images/pills_animation_3.mp4" 
        muted
        autoPlay={false}
        playsInline
        controls={false}
        preload="auto"
      />

      <div className="relative z-10 h-full w-full  flex pt-20 justify-center px-4 sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-general-black mb-6 max-w-5xl mx-auto">
            We focus on the often overlooked but vital health needs of African
            women
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-body-text-gray mb-8 max-w-2xl mx-auto px-4">
            Whether you're managing pain, planning a family, or just not feeling
            like yourself, we are here to help.
          </p>
          <ButtonComponent />
        </div>
      </div>
    </section>
  );
};
