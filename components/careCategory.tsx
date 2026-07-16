"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ButtonComponent from "./Button";

interface CareCategory {
  name: string;
  imagePath: string;
}

const categories: CareCategory[] = [
  { name: "Family Medicine", imagePath: "/images/family_medicine.svg" },
  { name: "Obstetrics & Gynaecology", imagePath: "/images/obstetrics.svg" },
  { name: "Dermatology", imagePath: "/images/dermatology.svg" },
  { name: "Mental Health", imagePath: "/images/mental_health.svg" },
  { name: "Endocrinology", imagePath: "/images/endocrinology.svg" },
  { name: "Haematology", imagePath: "/images/gynaecology.svg" },
  { name: "Nutrition & Dietetics ", imagePath: "/images/nutrition.svg" },
  { name: "And More", imagePath: "/images/neurology.svg" },
];

export default function CareCategoriesSection() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-general-black">
          Your Care, Your Way
        </h2>
        <p className="text-base text-body-text-gray mb-10 max-w-2xl mx-auto">
          At DébboAfrica, we connect you with trusted medical doctors,
          specialists, and allied professionals across key areas of women's
          health:
        </p>

        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
          {categories.map((category, index) => (
            <CareCard
              key={category.name}
              category={category}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>

        <p className="text-sm text-body-text-gray mt-10 max-w-xl mx-auto mb-6">
          Whether you’re seeking general advice, therapy, specialist
          consultations, or family planning services — you can access quality
          care, your way.
        </p>
        <ButtonComponent text="Download App" linkTo="/download" />
      </div>
    </section>
  );
}

const CareCard = React.forwardRef<HTMLDivElement, { category: CareCategory }>(
  ({ category }, ref) => {
    return (
      <div
        ref={ref as any}
        className={`bg-[--surface-card] rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm min-h-[150px] md:min-h-[200px] group`}
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
  }
);

CareCard.displayName = "CareCard";
