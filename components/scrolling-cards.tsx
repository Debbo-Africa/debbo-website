"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Tagline from "./Tagline";

interface Card {
  id: number;
  type: "image" | "color";
  src?: string;
  alt?: string;
  bgColor?: string;
  width?: string;
}

const firstRowCards: Card[] = [
  { id: 1, type: "color", bgColor: "bg-[#FF9B33]", width: "w-80" },
  {
    id: 2,
    type: "image",
    src: "/images/woman-polka.png",
    alt: "Woman with headwrap",
  },
  { id: 3, type: "color", bgColor: "bg-[#D76441]" },
  { id: 4, type: "color", bgColor: "bg-[#01AC9C]" },
  {
    id: 5,
    type: "image",
    src: "/images/woman-fitness.png",
    alt: "Woman exercising",
    width: "w-[20rem]",
  },
  { id: 6, type: "color", bgColor: "bg-[#FF9B33]" },
  { id: 7, type: "image", src: "/images/woman-polka.png", alt: "woman polka" },
  { id: 8, type: "color", bgColor: "bg-[#2B1D18]" },
  { id: 9, type: "color", bgColor: "bg-[#01AC9C]", width: "w-[20rem]" },
];

const secondRowCards: Card[] = [
  { id: 9, type: "color", bgColor: "bg-[#01AC9C]", width: "w-[20rem]" },
  { id: 10, type: "color", bgColor: "bg-[#FF9B33]", width: "w-[15rem]" },
  { id: 11, type: "color", bgColor: "bg-[#FF9B33]" },
  {
    id: 12,
    type: "image",
    src: "/images/girl-doc.png",
    alt: "Woman in polka dots",
    width: "w-[20rem]",
  },
  {
    id: 13,
    type: "image",
    src: "/images/woman-headwrap.png",
    alt: "Woman in polka dots",
  },
];

export default function ScrollingCards() {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firstRowRef.current || !secondRowRef.current) return;

    const widthMap: Record<string, number> = {
      "w-52": 208,
      "w-64": 256,
      "w-80": 320,
      "w-96": 384,
    };

    const calculateTotalWidth = (cards: Card[]) =>
      cards.reduce((sum, card) => {
        const widthClass = card.width || "w-52";
        const widthPx = widthMap[widthClass] || 208;
        return sum + widthPx + 32;
      }, 0);

    const totalWidthFirst = calculateTotalWidth(firstRowCards);
    const totalWidthSecond = calculateTotalWidth(secondRowCards);

    const animateRow = (
      element: HTMLElement,
      totalWidth: number,
      direction: "left" | "right"
    ) => {
      const keyframes =
        direction === "left"
          ? [
              { transform: `translateX(0%)` },
              { transform: `translateX(-${totalWidth}px)` },
            ]
          : [
              { transform: `translateX(-${totalWidth}px)` },
              { transform: `translateX(0%)` },
            ];

      const animation = element.animate(keyframes, {
        duration: 20000,
        iterations: Infinity,
        easing: "linear",
      });

      return animation;
    };

    const firstAnimation = animateRow(
      firstRowRef.current,
      totalWidthFirst,
      "left"
    );
    const secondAnimation = animateRow(
      secondRowRef.current,
      totalWidthSecond,
      "right"
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        firstAnimation.pause();
        secondAnimation.pause();
      } else {
        firstAnimation.play();
        secondAnimation.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      firstAnimation.cancel();
      secondAnimation.cancel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const getPixelWidth = (widthClass: string): number => {
    const widthMap: Record<string, number> = {
      "w-52": 208,
      "w-64": 256,
      "w-80": 320,
      "w-96": 384,
    };
    return widthMap[widthClass] || 208;
  };

  const renderCard = (card: Card) => {
    const cardWidth = card.width || "w-52";
    const pixelWidth = getPixelWidth(cardWidth);

    return (
      <div
        key={card.id}
        className={`flex-shrink-0 aspect-[3/2] ${cardWidth} h-[8.5rem] rounded-full mx-1 overflow-hidden ${
          card.type === "color" ? card.bgColor : "bg-gray-200"
        } relative`}
      >
        {card.type === "image" && card.src && (
          <div className="relative w-full aspect-[3/2]">
            <Image
              src={card.src}
              alt={card.alt || ""}
              fill
              sizes={`${pixelWidth}px`}
              className="object-cover w-full"
              priority={card.id <= 5}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-6 overflow-hidden">
      <div className="relative mb-2">
        <div ref={firstRowRef} className="flex items-center whitespace-nowrap">
          {[...firstRowCards, ...firstRowCards, ...firstRowCards].map(
            (card, index) => (
              <div key={`${card.id}-${index}`}>
                {renderCard({ ...card, id: card.id + index * 100 })}
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative">
        <div ref={secondRowRef} className="flex items-center whitespace-nowrap">
          {[...secondRowCards, ...secondRowCards, ...secondRowCards].map(
            (card, index) => (
              <div key={`${card.id}-${index}`}>
                {renderCard({ ...card, id: card.id + index * 100 })}
              </div>
            )
          )}
        </div>
      </div>

      <Tagline />
    </section>
  );
}
