"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const METRICS = [
  { value: 95, suffix: "%", label: "employee satisfaction rate", color: "text-orange-500" },
  { value: 2500, suffix: "+", label: "preventive health screenings delivered", color: "text-teal-500" },
  { value: 48, suffix: "", label: "hour follow-up support", color: "text-gray-900" },
];

export function CorporateMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    valueRefs.current.forEach((ref, index) => {
      if (ref) {
        const target = METRICS[index].value;
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              ref.textContent = Math.round(counter.value).toLocaleString();
            },
          },
          index * 0.2
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {METRICS.map((metric, index) => (
            <div key={metric.label} className="text-center flex-1">
              <h3 className={`text-5xl lg:text-6xl font-bold mb-2 font-serif ${metric.color}`}>
                <span ref={(el: any) => (valueRefs.current[index] = el)}>
                  0
                </span>
                {metric.suffix}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base font-bold">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
