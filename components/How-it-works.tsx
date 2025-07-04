"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate when section should start and end being active
      const startOffset = windowHeight * 0.2; // Start when section is 20% from top
      const endOffset = -sectionHeight + windowHeight * 0.8; // End when section is mostly past

      if (rect.top <= startOffset && rect.top >= endOffset) {
        // Section is in the active scroll zone
        const progress = (startOffset - rect.top) / (startOffset - endOffset);
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setScrollProgress(clampedProgress);
      } else if (rect.top > startOffset) {
        setScrollProgress(0);
      } else if (rect.top < endOffset) {
        setScrollProgress(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLargeScreen]);

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

  const renderCard = (card: any) => (
    <div
      key={card.id}
      className={`${
        isLargeScreen
          ? "flex-shrink-0 w-[450px] h-[540px]"
          : "w-full h-[580px] md:h-[450px]"
      } rounded-3xl relative overflow-hidden ${card.bgClass} ${
        !isLargeScreen ? "mb-4" : ""
      }`}
    >
      <Image
        src={card.image || "/placeholder.svg"}
        alt={card.alt}
        fill
        className="object-cover"
      />
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
          {card.title}
        </h3>
        <p
          className={`text-base leading-relaxed opacity-90 ${
            isLargeScreen
              ? "md:text-lg max-w-[280px] md:max-w-[340px]"
              : "max-w-[280px] sm:max-w-[400px]"
          }`}
        >
          {card.description}
        </p>
      </div>
    </div>
  );

  // Calculate transform based on scroll progress
  const getTransform = () => {
    if (!isLargeScreen) return {};

    const cardWidth = 450;
    const gap = 16;
    const padding = 64;
    const numCards = 4;
    const totalContentWidth =
      cardWidth * numCards + gap * (numCards - 1) + padding;
    const maxScroll = totalContentWidth - window.innerWidth;
    const translateX = -(scrollProgress * maxScroll);

    return {
      transform: `translateX(${translateX}px)`,
      transition: "transform 0.1s ease-out",
    };
  };

  return (
    <div>
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

      {isLargeScreen === null ? null : isLargeScreen ? (
        <div
          ref={sectionRef}
          className="sticky top-[20vh] overflow-hidden h-[540px] mb-[100vh]"
        >
          <div
            ref={containerRef}
            className="flex gap-4 px-8"
            style={{
              width: "fit-content",
              ...getTransform(),
            }}
          >
            {cards.map((card) => renderCard(card))}
          </div>
        </div>
      ) : (
        <div className="px-4 md:px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            {cards.map((card) => renderCard(card))}
          </div>
        </div>
      )}
    </div>
  );
}


