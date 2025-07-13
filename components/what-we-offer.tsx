"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const OFFER_ITEMS = [
  {
    id: "product",
    title: "Product",
    description:
      "Through the MyDébbo App and our Lekki Lounge, we provide personalised, patient-centred support, from symptom to solution, ensuring timely care online and in person.",
    image: "/images/product-card.png",
    category: "Product",
  },
  {
    id: "programs",
    title: "Programs",
    description:
      "Through our Corporate Wellness Programs, we partner with leading employers to support employee health via screenings, workplace seminars, and personalised care pathways.",
    image: "/images/programs-card.png",
    category: "Programs",
  },
  {
    id: "communities",
    title: "Communities",
    description:
      "At DébboAfrica, we believe healing is personal, not just medical. Through DébboTribe, we're creating a supportive space platform where women connect, share real stories, and bloom together.",
    image: "/images/communities-card.png",
    category: "Communities",
  },
];

export function WhatWeOfferSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalDuration = 100; // ms
    const totalDuration = 30000; // 30 seconds
    const increment = (intervalDuration / totalDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setCurrentIndex((current) => {
            if (current === 0) return 1; // 1 → 2
            if (current === 1) return 2; // 2 → 3
            if (current === 2) return 1; // 3 → 2
            return 0;
          });
          return 0;
        }
        return next;
      });
    }, intervalDuration);

    return () => clearInterval(progressInterval);
  }, []);

  const currentItem = OFFER_ITEMS[currentIndex];

  const handleCategoryClick = (category: string) => {
    const index = OFFER_ITEMS.findIndex((item) => item.category === category);
    if (index !== -1) {
      setCurrentIndex(index);
      setProgress(0);
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                What We Offer
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Through our products, programs, and communities, we meet women
                exactly where they are, providing comprehensive and
                compassionate healthcare solutions.
              </p>
            </div>

            <div className="flex flex-row space-x-3 overflow-x-auto md:flex-col md:space-x-0 md:space-y-3 ">
              {OFFER_ITEMS.map((item, index) => {
                const isActive = index === currentIndex;

                return (
                  <div
                    key={item.category}
                    className="flex-shrink-0 md:relative"
                  >
                    <button
                      onClick={() => handleCategoryClick(item.category)}
                      className={`block text-left px-6 py-4 rounded-full mb-4 transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? "bg-[--surface-card]"
                          : "text-general-black hover:bg-[--surface-card]"
                      }`}
                    >
                      {isActive && (
                        <div
                          className="absolute inset-0 bg-gray-200 transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                      <span className="font-medium relative z-10">
                        {item.category}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative bg-[--surface-card] p-6 pr-0 rounded-xl">
            <div className="relative overflow-hidden rounded-2xl">
              <div className="flex items-center justify-center">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(calc(-${currentIndex * 90}% + ${
                      currentIndex * 5
                    }%))`,
                    width: `${
                      OFFER_ITEMS.length * 90 + (OFFER_ITEMS.length - 1) * 5
                    }%`,
                  }}
                >
                  {OFFER_ITEMS.map((item, index) => {
                    const isActive = index === currentIndex;
                    const isAdjacent = Math.abs(index - currentIndex) === 1;

                    return (
                      <div
                        key={item.id}
                        className="flex-shrink-0 transition-all duration-300 ease-in-out"
                        style={{
                          width: "90%",
                          opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.3,
                          transform: isActive ? "scale(1)" : "scale(0.9)",
                        }}
                      >
                        <div
                          className={`relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${
                            isActive
                              ? "shadow-2xl"
                              : "shadow-lg hover:shadow-xl"
                          }`}
                          onClick={() => {
                            setCurrentIndex(index);
                            setProgress(0);
                          }}
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />

                          {!isActive && (
                            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6 mt-4">
              <p className="text-gray-700 leading-relaxed text-base">
                {currentItem.description}
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3">
                Download App →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
