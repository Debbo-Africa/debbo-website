"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Only run GSAP animation on large screens
    if (!isLargeScreen) return;

    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    const cardWidth = 450;
    const gap = 16; // gap-4 = 1rem = 16px
    const padding = 64; // px-8 on desktop
    const numCards = 4;

    const totalContentWidth =
      cardWidth * numCards + gap * (numCards - 1) + padding;
    const scrollDistance = totalContentWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 20%", // Start when section is 20% from top instead of immediately
        end: () => `+=${Math.max(scrollDistance, 100)}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(container, {
      x: -scrollDistance,
      ease: "none",
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLargeScreen]);

  // Card data for easier management
  const cards = [
    {
      id: 1,
      title: "Triage",
      description:
        "Our AI-powered tool helps guide you to the right care quickly and safely.",
      image: "/images/triage-phone.png",
      alt: "Triage phone interface",
      bgClass: "",
    },
    {
      id: 2,
      title: "Consult",
      description: "Speak with licensed doctors virtually or in person.",
      image: "/images/consult-phone.png",
      alt: "Consult phone interface",
      bgClass: "",
    },
    {
      id: 3,
      title: "Act",
      description:
        "Need a lab test or scan? We come to you, or you can visit our trusted facilities. All tests are reviewed by trusted clinical experts.",
      image: "/images/act-microscope.png",
      alt: "Medical microscope",
      bgClass: "bg-gradient-to-br from-gray-800 to-gray-900",
    },
    {
      id: 4,
      title: "Support",
      description:
        "Care doesn't end with a test. Track results, access health reminders, join community forums, and learn from personalised content in the app.",
      image: "/images/doctor.png",
      alt: "Doctor providing care",
      bgClass: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
  ];

  const renderCard = (card: any, index: number) => (
    <div
      key={card.id}
      className={`
        ${
          isLargeScreen
            ? "flex-shrink-0 w-[450px] h-[540px]"
            : "w-full h-[580px] md:h-[450px]"
        } 
        rounded-3xl relative overflow-hidden ${card.bgClass}
        ${!isLargeScreen ? "mb-4" : ""}
      `}
    >
      <Image src={card.image} alt={card.alt} fill className="object-cover" />
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
          {card.title}
        </h3>
        <p
          className={`
          text-base leading-relaxed opacity-90
          ${
            isLargeScreen
              ? "md:text-lg max-w-[280px] md:max-w-[340px]"
              : "max-w-[280px] sm:max-w-[400px]"
          }
        `}
        >
          {card.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
          Discover the seamless process behind our approach.
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Every woman's health story is different. We're here to support your
          journey through our free AI-powered mobile app — a digital health
          companion thoughtfully guided by doctors who care.
        </p>
      </div>

      {/* Conditional rendering based on screen size */}
      {isLargeScreen ? (
        /* Horizontal Scroll Section for Large Screens */
        <div ref={sectionRef} className="relative overflow-hidden h-[540px]">
          <div
            ref={containerRef}
            className="flex gap-4 px-8"
            style={{ width: "fit-content" }}
          >
            {cards.map((card, index) => renderCard(card, index))}
          </div>
        </div>
      ) : (
        /* Vertical Layout for Medium and Small Screens */
        <div className="px-4 md:px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            {cards.map((card, index) => renderCard(card, index))}
          </div>
        </div>
      )}
    </div>
  );
}
