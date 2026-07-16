"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ButtonComponent from "./Button";
import Link from "next/link";

const OFFER_ITEMS = [
  {
    id: "product",
    title: "Product",
    description:
      "Through the MyDébbo App and our Lekki Lounge, we provide personalised, patient-centred support, from symptom to solution, ensuring timely care online and in person.",

    image: "/images/communities-card.png",
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
    image: "/images/product-card.png",
    category: "Communities",
  },
];

const customOrder = [0, 2, 1];

export function WhatWeOfferSection() {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const intervalDuration = 100;
    const totalDuration = 7000;
    const increment = (intervalDuration / totalDuration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          setCurrentOrderIndex(
            (prevIndex) => (prevIndex + 1) % customOrder.length
          );
          return 0;
        }
        return next;
      });
    }, intervalDuration);

    return () => clearInterval(progressInterval);
  }, []);

  const currentIndex = customOrder[currentOrderIndex];
  const currentItem = OFFER_ITEMS[currentIndex];

  const handleCategoryClick = (category: string) => {
    const index = OFFER_ITEMS.findIndex((item) => item.category === category);
    if (index !== -1) {
      const orderIndex = customOrder.indexOf(index);
      if (orderIndex !== -1) {
        setCurrentOrderIndex(orderIndex);
        setProgress(0);
      }
    }
  };

  const shiftMap: any = {
    mobile: { 0: 0, 1: 40, 2: 75 },
    tablet: { 0: 0, 1: 100, 2: 200 },
    desktop: { 0: 0, 1: 130, 2: 250 },
  };

  const extraShift = shiftMap[screenSize][currentIndex] || 0;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[30%] space-y-8 text-center lg:text-left">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-general-black mb-6">
              What We Offer
            </h2>
            <p className="text-body-text-gray text-lg leading-relaxed mb-8">
              Through our products, programs, and communities, we meet women
              exactly where they are, providing comprehensive and compassionate
              healthcare solutions.
            </p>
          </div>

          <div className="flex flex-row space-x-2 overflow-x-auto lg:flex-col md:space-x-0 md:space-y-2">
            {OFFER_ITEMS.map((item, index) => {
              const isActive = index === currentIndex;

              return (
                <div
                  key={item.category}
                  className="flex-shrink-0 md:relative mb-4 lg:mb-0"
                >
                  <button
                    onClick={() => handleCategoryClick(item.category)}
                    className={`block text-left px-4 py-3 rounded-full transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? "bg-[--surface-card]"
                        : "text-general-black hover:bg-[--surface-card]"
                    }`}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-[#D9D0C6] transition-all duration-100 ease-linear"
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

        <div className="w-full lg:w-[70%] relative bg-[--surface-card] pr-0 rounded-2xl lg:rounded-3xl">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="flex items-center justify-center">
              <div
                className="flex transition-transform duration-300 ease-in-out md:px-4 lg:p-4"
                style={{
                  transform: `translateX(calc(-${
                    currentIndex * 100
                  }% + ${extraShift}px))`,
                  width: `${OFFER_ITEMS.length * 100}%`,
                }}
              >
                {OFFER_ITEMS.map((item, index) => {
                  const isActive = index === currentIndex;

                  return (
                    <div
                      key={item.id}
                      className="flex-shrink-0 transition-all duration-300 ease-in-out py-4 ml-2 md:ml-4 "
                      style={{
                        width: "90%",
                      }}
                    >
                      <div
                        className="relative aspect-[4/3] md:aspect-[4/2] rounded-3xl overflow-hidden cursor-pointer transition-all duration-200"
                        onClick={() => handleCategoryClick(item.category)}
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

          <div className="space-y-6 -mt-4  p-4 px-4 md:px-10 mb-4">
            <p className="text-body-text-gray leading-relaxed text-base mb-4">
              {currentItem.description}
            </p>
            {currentItem.id === "communities" ? (
              <Link
                href="https://chat.whatsapp.com/I9suQLPL6QlEtxux2Uw73S"
                target="_blank"
              >
                <ButtonComponent linkTo="" text="Explore Our Communities" />
              </Link>
            ) : currentItem.id === "programs" ? (
              <ButtonComponent linkTo="/corporate" text="Learn More" />
            ) : (
              <ButtonComponent linkTo="/download" text="Download App" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
