"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface TaglineProps {
  bgColor?: string;
  textColor?: string;
}

export default function Tagline({
  bgColor = "bg-[#2b1d18]",
  textColor = "text-gray-text",
}: TaglineProps) {
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!taglineRef.current) return;

    const taglineWidth = taglineRef.current.scrollWidth / 3;

    const animation = taglineRef.current.animate(
      [
        { transform: "translateX(0%)" },
        { transform: `translateX(-${taglineWidth}px)` },
      ],
      {
        duration: 20000,
        iterations: Infinity,
        easing: "linear",
      }
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        animation.pause();
      } else {
        animation.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      animation.cancel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className={`${bgColor} overflow-hidden`}>
      <div className="flex gap-10 py-4 whitespace-nowrap" ref={taglineRef}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 justify-center items-center px-4">
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${textColor}`}
            >
              Rooted in Africa, Driven by AI, Built for Her.
            </h2>
            <Image
              src="/images/Brand-Logo-Icon.png"
              alt="brand logo"
              className="w-10 h-10"
              width={20}
              height={20}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        ))}
      </div>
    </div>
  );
}
