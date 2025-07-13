"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  {
    value: 25,
    suffix: "%",
    title:
      "Reduction in sick days with effective wellness programs, boosting consistency and workplace presence",
    source: "Source: World Health Organization (WHO)",
    color: "text-orange-500",
  },
  {
    value: 30,
    suffix: "%",
    title:
      "Lower long-term healthcare costs through preventive care like screenings, stress management, and early intervention.",
    source: "Source: McKinsey & Company",
    color: "text-teal-500",
  },
  {
    value: 21,
    suffix: "%",
    title: "Higher profitability in companies with engaged, healthy teams.",
    source: "Source: Gallup Workplace Report",
    color: "text-gray-900",
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate each stat counter
    statsRefs.current.forEach((statRef, index) => {
      if (statRef) {
        const targetValue = STATS_DATA[index].value;
        const counter = { value: 0 };

        tl.to(
          counter,
          {
            value: targetValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              statRef.textContent = Math.round(counter.value).toString();
            },
          },
          index * 0.2 // Stagger the animations
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {STATS_DATA.map((stat, index) => (
            <div key={index} className="text-left">
              <div
                className={`text-5xl lg:text-6xl font-bold mb-4 ${stat.color}`}
              >
                <span ref={(el:any) => (statsRefs.current[index] = el)}>0</span>
                {stat.suffix}
              </div>
              <p className="text-general-black text-lg leading-relaxed mb-3">
                {stat.title}
              </p>
              <p className="text-sm text-gray-text italic">{stat.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
