"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type React from "react";

type HowItWorksCardProps = {
  image: React.ReactNode;
  step: string;
  title: string;
  description: string;
  stepColor?: string;
};

export default function HowItWorksCard({
  image,
  step,
  title,
  description,
  stepColor = "text-general-black",
}: HowItWorksCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        duration: 0.3,
        ease: "power1.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power1.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="how-it-works-card flex flex-col items-center text-center gap-4"
    >
      <div className="w-full max-w-[350px] h-[200px] flex items-center justify-center rounded-xl overflow-hidden">
        {image}
      </div>
      <div className="max-w-[350px] mx-auto">
        <h3 className="text-md font-extrabold text-general-black">
          <h4 className={`inline-block ${stepColor}`}>{step}</h4>{" "}
          <h4 className="inline-block">{title}</h4>
        </h3>
        <p
          className="text-sm text-body-text-gray mt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}
