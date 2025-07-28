"use client";

import { useEffect, useRef, useState } from "react";
import ButtonComponent from "./Button";

// Pills data with responsive position and rotation
const healthConditions = [
  {
    text: "Menopause Care",
    color: "bg-[--color-secondary-debbo2]",
    x: { default: 40, md: 130, lg: 400 },
    finalY: { default: 450, md: 840, lg: 420 },
    rotate: { default: 0, md: 4, lg: 0 },
  },
  {
    text: "Endometriosis",
    color: "bg-[--color-secondary-debbo3]",
    x: { default: 120, md: -10, lg: 0 },
    finalY: { default: 500, md: 800, lg: 580 },
    rotate: { default: -8, md: -90, lg: 12 },
  },
  {
    text: "Mental Health",
    color: "bg-[--color-secondary-debbo4]",
    x: { default: -100, md: 140, lg: 280 },
    finalY: { default: 580, md: 750, lg: 540 },
    rotate: { default: 5, md: 8, lg: 10 },
  },
  {
    text: "Skin & Gut Concerns",
    color: "bg-[--color-secondary-debbo9]",
    x: { default: 280, md: 320, lg: 960 },
    finalY: { default: 500, md: 660, lg: 440 },
    rotate: { default: -20, md: -18, lg: -16 },
  },
  {
    text: "Fibroids",
    color: "bg-[--color-secondary-debbo9]",
    x: { default: 520, md: 560, lg: 580 },
    finalY: { default: 420, md: 700, lg: 550 },
    rotate: { default: 10, md: 8, lg: 6 },
  },
  {
    text: "Sexual Health",
    color: "bg-[--color-secondary-debbo6]",
    x: { default: -100, md: 640, lg: 230 },
    finalY: { default: 650, md: 850, lg: 650 },
    rotate: { default: 0, md: -12, lg: -10 },
  },
  {
    text: "General Health",
    color: "bg-[--color-secondary-debbo10]",
    x: { default: 80, md: 720, lg: 1140 },
    finalY: { default: 680, md: 700, lg: 540 },
    rotate: { default: -10, md: 6, lg: 5 },
  },
  {
    text: "Hormonal Disorders",
    color: "bg-[--color-secondary-debbo4]",
    x: { default: 360, md: 400, lg: 760 },
    finalY: { default: 420, md: 780, lg: 550 },
    rotate: { default: 12, md: 10, lg: 20 },
  },
  {
    text: "PCOS",
    color: "bg-[--color-secondary-debbo6]",
    x: { default: 300, md: 800, lg: 840 },
    finalY: { default: 640, md: 650, lg: 650 },
    rotate: { default: 3, md: 4, lg: 5 },
  },
  {
    text: "Cervical Cancer",
    color: "bg-[--color-secondary-debbo3]",
    x: { default: 100, md: 880, lg: 510 },
    finalY: { default: 590, md: 650, lg: 650 },
    rotate: { default: -12, md: -14, lg: 0 },
  },
  {
    text: "Gynaecology",
    color: "bg-[--color-secondary-debbo5]",
    x: { default: 440, md: 400, lg: 1150 },
    finalY: { default: 420, md: 850, lg: 650 },
    rotate: { default: -8, md: -6, lg: -10 },
  },
];

const getResponsiveValue = (val: any) => {
  const width = window.innerWidth;
  if (width >= 1024 && val.lg !== undefined) return val.lg;
  if (width >= 768 && val.md !== undefined) return val.md;
  return val.default;
};

export const Trust = () => {
  const sceneRef = useRef(null);
  const pillsRef: any = useRef([]);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sceneRef.current) observer.observe(sceneRef.current);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return;

    const pills = pillsRef.current;
    const gravity = 0.3;
    const baseDelay = 300;
    const staggerSpeed = 50; 

    const responsivePositions = healthConditions.map((pill, index) => {
      return {
        index,
        x: getResponsiveValue(pill.x),
        y: -100,
        vy: 0,
        angle: getResponsiveValue(pill.rotate),
        vAngle: Math.random() * 0.5 - 0.25,
        finalY: getResponsiveValue(pill.finalY),
      };
    });

    const sorted = [...responsivePositions].sort((a, b) => b.finalY - a.finalY);

    sorted.forEach((p, orderIndex) => {
      setTimeout(() => {
        const animatePill = () => {
          if (p.y < p.finalY) {
            p.vy += gravity;
            p.y += p.vy;
            if (p.y > p.finalY) p.y = p.finalY;
            p.angle += p.vAngle;

            const pill = pills[p.index];
            if (pill)
              pill.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)`;

            requestAnimationFrame(animatePill);
          }
        };
        requestAnimationFrame(animatePill);
      }, baseDelay + orderIndex * staggerSpeed);
    });
  }, [shouldAnimate]);

  return (
    <section className="relative h-[100vh] overflow-hidden rounded-3xl bg-[--surface-card]">
      <div
        ref={sceneRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      >
        {healthConditions.map((item, index) => (
          <h1
            key={index}
            ref={(el: any) => (pillsRef.current[index] = el)}
            className={`absolute text-general-black rounded-full font-bold px-8 py-4 text-lg sm:text-xl md:text-2xl lg:text-4xl ${item.color}`}
            style={{
              top: 0,
              transform: `translateY(-100px) rotate(0deg)`,
              whiteSpace: "nowrap",
              pointerEvents: "auto",
            }}
          >
            {item.text}
          </h1>
        ))}
      </div>

      <div className=" mx-auto px-4 sm:px-8 relative z-20 pt-20 bg-[--surface-card]">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-general-black mb-6">
            We focus on conditions that
            <br />
            significantly impact African women
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
