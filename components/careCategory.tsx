"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface CareCategory {
  name: string;
  imagePath: string;
}

const categories: CareCategory[] = [
  { name: "Family Medicine", imagePath: "/images/family_medicine.svg" },
  { name: "Obstetrics", imagePath: "/images/obstetrics.svg" },
  { name: "Gynaecology", imagePath: "/images/gynaecology.svg" },
  { name: "Mental Health", imagePath: "/images/mental_health.svg" },
  { name: "Nutrition & Dietetics", imagePath: "/images/nutrition.svg" },
  { name: "Dermatology", imagePath: "/images/dermatology.svg" },
  { name: "Endocrinology", imagePath: "/images/endocrinology.svg" },
  { name: "Neurology", imagePath: "/images/neurology.svg" },
];

export default function CareCategoriesSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-general-black">
          Your Care, Your Way
        </h2>
        <p className="text-base text-body-text-gray mb-10 max-w-2xl mx-auto">
          At DébboAfrica, we connect you with trusted medical doctors,
          specialists, and allied professionals across key areas of women's
          health:
        </p>

        <div className="hidden lg:grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CareCard
              key={category.name}
              category={category}
              isFaded={index >= 4}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
          {categories.slice(0, 4).map((category, index) => (
            <CareCard
              key={category.name}
              category={category}
              isFaded={index >= 2}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        <div className="grid md:hidden grid-cols-1 gap-4">
          {categories.slice(0, 2).map((category, index) => (
            <CareCard
              key={category.name}
              category={category}
              isFaded={index >= 1}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        <p className="text-sm text-body-text-gray mt-10 max-w-xl mx-auto">
          Whether you’re seeking general advice, therapy, specialist
          consultations, or family planning services — you can access quality
          care, your way.
        </p>
      </div>
    </section>
  );
}

const CareCard = React.forwardRef<
  HTMLDivElement,
  { category: CareCategory; isFaded: boolean }
>(({ category, isFaded }, ref) => {
  return (
    <div
      ref={ref as any}
      className={`bg-[--surface-card] rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm min-h-[200px] ${
        isFaded ? "opacity-30" : ""
      } group`} 
    >
      <div className="w-20 h-20 mb-4">
        <Image
          src={category.imagePath}
          alt={category.name}
          width={80}
          height={80}
          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="text-sm font-medium">{category.name}</p>
    </div>
  );
});

CareCard.displayName = "CareCard";
