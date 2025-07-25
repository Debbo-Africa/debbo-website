"use client";

import React from "react";
import Image from "next/image";

const DebboAfricaHubSection = () => {
  return (
    <section className="flex flex-col gap-8 py-20 px-6 max-w-7xl mx-auto">
      <div className="relative w-full overflow-hidden rounded-xl bg-gray-200 h-[400px] md:h-[500px]">
        <Image
          src="/images/debbo-hub.jpg"
          alt="Student hub"
          fill
          className="object-cover transform transition duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 75vw"
          priority
        />

        <h1 className="absolute bottom-4 md:bottom-6 md:left-6 left-4 text-white font-semibold text-2xl md:text-4xl">
          Débbo Africa
          <br />
          Student Hub
          <br />
          DASH
        </h1>
      </div>
    </section>
  );
};

export default DebboAfricaHubSection;
