"use client";

import { useState } from "react";
import Image from "next/image";
import ButtonComponent from "./Button";

export const ImpactStatsSection = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <>
      {/* Mobile */}
      <div className="block md:hidden space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-general-black mb-4 leading-tight">
            Impact that Matters
          </h2>
          <p className="text-base text-body-text-gray leading-relaxed mb-6">
            African women's health has been overlooked and undervalued, leading
            to significant gaps in care and understanding. At Débbo Africa,
            we're here to change this — with care that listens, understands, and
            meets you where you are.
          </p>
          <ButtonComponent />
        </div>

        <div className="space-y-4 px-2">
          <div className="bg-yellow rounded-2xl p-6 py-12 text-general-black">
            <div className="text-4xl font-bold mb-2">80%</div>
            <p className="text-md font-medium">
              of Black women will develop fibroids by age 50. Most go
              undiagnosed for years.
            </p>
          </div>

          <div className="bg-secondary-debbo1 rounded-2xl p-6 py-12 text-general-black items-start gap-4">
            <Image
              src="/images/earth-africa.png"
              alt="Africa"
              width={16}
              height={16}
              className="w-16 h-16 mb-2"
            />
            <div className="text-md">
              <span className="font-medium">
                Millions of African women are living with Polycystic Ovarian
                Syndrome (PCOS), many without even knowing it.
              </span>
            </div>
          </div>

          <div className="bg-green rounded-3xl p-6 py-12 text-general-black">
            <Image
              src="/images/Vector.png"
              alt="Africa"
              width={16}
              height={16}
              className="w-16 h-16 mb-2"
            />
            <p className="text-md font-medium">
              19 of the 20 countries with the highest cervical cancer burden are
              in Africa.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8 h-full flex flex-col justify-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-general-black mb-6 leading-snug">
                Impact that <br /> Matters
              </h2>
              <p className="text-lg text-body-text-gray leading-relaxed mb-8">
                For far too long, the health concerns and symptoms experienced
                by African women have been overlooked and undervalued in both
                medical research and healthcare practices. This neglect has led
                to a significant gap in understanding and addressing their
                unique health needs.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <ButtonComponent />
              </div>
            </div>
          </div>

          <div className="bg-[--surface-card] rounded-3xl p-6 pr-0 relative overflow-hidden h-full">
            <div className="space-y-2">
              <div
                className={`bg-yellow rounded-l-full p-6 ml-8 transition-transform duration-300 ease-out ${
                  hoveredStat === 0 ? "transform translate-x-4" : ""
                }`}
                onMouseEnter={() => setHoveredStat(0)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="text-2xl font-bold text-general-black">
                    80%
                  </div>
                  <div className="text-black text-sm mt-2 leading-tight">
                    of Black women will develop fibroids by age 50. Most go
                    undiagnosed for years.
                  </div>
                </div>
              </div>

              <div
                className={`bg-secondary-debbo1 rounded-l-full p-6 ml-8 transition-transform duration-300 ease-out ${
                  hoveredStat === 1 ? "transform translate-x-4" : ""
                }`}
                onMouseEnter={() => setHoveredStat(1)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/earth-africa.png"
                      alt="Medical"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-sm text-general-black leading-tight">
                    <span className="font-medium">
                      19 of the 20 countries with the highest cervical cancer
                      burden are in Africa.
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`bg-green rounded-l-full p-6 ml-8 transition-transform duration-300 ease-out ${
                  hoveredStat === 2 ? "transform translate-x-4" : ""
                }`}
                onMouseEnter={() => setHoveredStat(2)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Image
                      src="/images/Vector.png"
                      alt="Africa"
                      width={24}
                      height={24}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="text-sm text-general-black leading-tight">
                    <span className="font-medium">
                      Millions of African women are living with Polycystic
                      Ovarian Syndrome (PCOS), many without even knowing it.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
