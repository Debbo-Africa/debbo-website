"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const WideningAccessSection = ({
  title = "Widening access to quality healthcare.",
  description1 = "DébboCares is our dedicated foundation focused on expanding access to quality healthcare for women in underserved communities. We’re committed to breaking down barriers by promoting health education, empowering informed decisions, and supporting proactive wellness.",
  description2 = "Partner with us to expand access to quality care for all women.",
  buttonText = "Join Our Mission →",
  imageSrc = "/images/widening-access.jpg",
  imageAlt = "Women smiling",
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 py-20 px-6 max-w-7xl mx-auto">
      <div className="flex-shrink-0 w-full md:w-1/2">
        <div className="relative rounded-xl overflow-hidden bg-gray-200 h-80 md:h-[400px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transform transition duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 leading-snug">
          {title}
        </h2>
        <p className="text-body-text-gray mb-6">
          {description1}
        </p>
        {description2 && (
          <p className="text-body-text-gray mb-6">
            {description2}
          </p>
        )}
        <Button className="px-5 py-3 w-full md:w-fit bg-black text-white rounded-full hover:bg-gray-900 transition">
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default WideningAccessSection;
