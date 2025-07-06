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

      const startOffset = windowHeight * 0.2;
      const endOffset = -sectionHeight + windowHeight * 0.8;

      if (rect.top <= startOffset && rect.top >= endOffset) {
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
      bgClass: "",
    },
    {
      id: 4,
      title: "Support",
      description:
        "Care doesn't end with a test. Track results, access health reminders, join community forums, and learn from personalised content in the app.",
      image: "/images/doctor.png",
      alt: "Doctor providing care",
      bgClass: "",
    },
  ];


  const renderCard = (card: any) => (
    <div
      key={card.id}
      className={`flex-shrink-0 w-[450px] h-[540px] rounded-3xl relative overflow-hidden ${card.bgClass}`}
    >
      <Image
        src={card.image || "/placeholder.svg"}
        alt={card.alt}
        fill
        className="object-cover"
      />
      <div
        className={`absolute top-6 left-6 md:top-8 md:left-8 z-10 ${
          card.id === 1 ? "text-general-white" : "text-general-black"
        }`}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 ">
          {card.title}
        </h3>
        <p className="text-base leading-relaxed opacity-90 md:text-lg max-w-[280px] md:max-w-[340px]">
          {card.description}
        </p>
      </div>
    </div>
  );

  const getTransform = () => {
    if (!isLargeScreen) return {};

    const cardWidth = 450;
    const gap = 16;
    const padding = 64;
    const numCards = cards.length;
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
        <h2 className="text-4xl md:text-5xl font-bold text-general-white mb-6 max-w-4xl mx-auto leading-tight">
          Discover the seamless process behind our approach.
        </h2>
        <p className="text-lg text-gray-text max-w-3xl mx-auto leading-relaxed">
          Every woman's health story is different. We're here to support your
          journey through our free AI-powered mobile app — a digital health
          companion thoughtfully guided by doctors who care.
        </p>
      </div>

      {isLargeScreen === null ? null : isLargeScreen ? (
        <div
          ref={sectionRef}
          className="sticky top-[20vh] overflow-hidden h-[540px]"
          style={{
            // Dynamically calculate required bottom margin based on total scroll
            marginBottom: `${
              ((450 * cards.length +
                16 * (cards.length - 1) +
                64 -
                window.innerWidth) /
                window.innerWidth) *
              window.innerHeight
            }px`,
          }}
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
