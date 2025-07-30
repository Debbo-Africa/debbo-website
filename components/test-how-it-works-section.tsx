"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import HowItWorksCard from "./test-card-how-it-work";

const defaultHowItWorksData = [
  {
    image: "/images/order.jpg",
    alt: "Order",
    step: "01.",
    stepColor: "text-green",
    title: "Order Your Tests",
    description:
      "Select a test or package from our website and add it to your cart.",
  },
  {
    image: "/images/schedule.jpg",
    alt: "Schedule",
    step: "02.",
    stepColor: "text-[#FF9B33]",
    title: "Schedule Your Sample Collection",
    description:
      "Our team will contact you to schedule your appointment, at home or in our facility.",
  },
  {
    image: "/images/test3.jpg",
    alt: "Get Tested",
    step: "03.",
    stepColor: "text-[#D76441]",
    title: "Get Tested",
    description:
      "A licensed health professional will collect your sample safely and privately.",
  },
  {
    image: "/images/results.jpg",
    alt: "Results",
    step: "04.",
    title: "Receive Your Results",
    description: `Your sample is processed at one of our labs. Results are shared securely via our <a href="https://celldiagnosticslimited.com/login/" target="_blank" rel="noopener noreferrer" class="font-bold underline text-green-600">patient portal</a>, with clinical follow-up if needed.`,
  },
];

interface HowItWorksItem {
  image: string;
  alt: string;
  step: string;
  stepColor?: string;
  title: string;
  description: string;
}

interface Props {
  data?: HowItWorksItem[];
}

export default function HowItWorksSection({
  data = defaultHowItWorksData,
}: Props) {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".how-it-works-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8" ref={cardsContainerRef}>
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {data.map((item, index) => (
            <HowItWorksCard
              key={index}
              image={
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  width={350}
                  height={250}
                  className="w-full h-48 object-cover rounded-lg"
                />
              }
              step={item.step}
              stepColor={item.stepColor}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
