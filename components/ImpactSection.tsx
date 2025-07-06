"use client";

import { useState } from "react";
import Image from "next/image";
import ButtonComponent from "./Button";

export const ImpactSection = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section className="relative w-full py-20 bg-gradient-to-br">
      <div className="max-w-7xl mx-auto px-4">
        <div className="block md:hidden space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Impact that Matters
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-6">
              African women's health has been overlooked and undervalued,
              leading to significant gaps in care and understanding. At Débbo
              Africa, we're here to change this — with care that listens,
              understands, and meets you where you are.
            </p>
            <ButtonComponent />
          </div>

          {/* Statistics Cards - Mobile */}
          <div className="space-y-4 px-2">
            <div className="bg-[#FF9B33] rounded-2xl p-6 py-12 text-black">
              <div className="text-4xl font-bold mb-2">80%</div>
              <p className="text-md font-medium">
                of Black women will develop fibroids by age 50. Most go
                undiagnosed for years.
              </p>
            </div>

            <div className="bg-red-400 rounded-2xl p-6 py-12 text-black  items-start gap-4">
              <Image
                src="/images/earth-africa.png"
                alt="Africa"
                width={16}
                height={16}
                className="w-16 h-16 mb-2"
              />
              <div className="text-md ">
                <span className="font-medium">
                  Millions of African women are living with Polycystic Ovarian
                  Syndrome (PCOS), many without even knowing it.
                </span>
              </div>
            </div>

            <div className="bg-teal-400 rounded-3xl p-6 py-12 text-black">
              <Image
                src="/images/Vector.png"
                alt="Africa"
                width={16}
                height={16}
                className="w-16 h-16 mb-2"
              />
              <p className="text-md font-medium">
                19 of the 20 countries with the highest cervical cancer burden
                are in Africa.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
              Start for free.
            </h2>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Stay in control.
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              We work with insurance providers and employer health plans to make
              your care even more affordable. Our HMO partners include AXA
              Mansard, Reliance, Leadway, BUPA and Allianz.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Image
                src="/images/AXA_Mansard.png"
                alt="AXA Mansard"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
              <Image
                src="/images/reliance.png"
                alt="Reliance"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
              <Image
                src="/images/leadway.png"
                alt="Leadway"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
              <Image
                src="/images/Allianz-1.png"
                alt="Allianz"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
              <Image
                src="/images/bupa.png"
                alt="BUPA"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
            </div>
          </div>

          {/* No insurance section - Mobile */}
          <div className="relative rounded-3xl overflow-hidden min-h-[500px] text-white">
            <Image
              src="/images/woman-smiling.png"
              alt="Smiling woman"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-2xl font-bold mb-1">No insurance?</h3>
              <h3 className="text-2xl font-bold mb-4">No problem.</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                We offer flexible, transparent payment options that work for
                you.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-8 h-full flex flex-col justify-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-general-white mb-6 leading-snug">
                  Impact that <br /> Matters
                </h2>
                <p className="text-lg text-gray-text leading-relaxed mb-8">
                  For far too long, the health concerns and symptoms experienced
                  by African women have been overlooked and undervalued in both
                  medical research and healthcare practices. This neglect has
                  led to a significant gap in understanding and addressing their
                  unique health needs.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <ButtonComponent />
                </div>
              </div>
            </div>

            <div className="bg-[#F2E9DD] rounded-3xl p-6 pr-0 relative overflow-hidden h-full">
              <div className="space-y-2">
                {/* 80% Statistic - Orange */}
                <div
                  className={`bg-[#FF9B33] rounded-l-full p-6 ml-8 transition-transform duration-300 ease-out ${
                    hoveredStat === 0 ? "transform translate-x-4" : ""
                  }`}
                  onMouseEnter={() => setHoveredStat(0)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="text-2xl font-bold text-black">80%</div>
                    <div className="text-black text-sm mt-2 leading-tight">
                      of Black women will develop fibroids by age 50. Most go
                      undiagnosed for years.
                    </div>
                  </div>
                </div>

                {/* First Africa statistic - Coral */}
                <div
                  className={`bg-red-400 rounded-l-full p-6 ml-8 transition-transform duration-300 ease-out ${
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
                    <div className="text-sm text-black leading-tight">
                      <span className="font-medium">
                        19 of the 20 countries with the highest cervical cancer
                        burden are in Africa.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Second Africa statistic - Teal */}
                <div
                  className={`bg-teal-400 rounded-l-full p-6 ml-8 transition-transform duration-300 ease-out ${
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
                    <div className="text-sm text-black leading-tight">
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

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
            <div className="relative rounded-3xl overflow-hidden min-h-[400px] text-white">
              <Image
                src="/images/woman-smiling.png"
                alt="Smiling woman"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10 max-w-xs text-general-black">
                <h3 className="text-2xl font-bold mb-1 ">No insurance?</h3>
                <h3 className="text-2xl font-bold mb-6">No problem.</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  We offer flexible, transparent payment options that work for
                  you.
                </p>
              </div>
            </div>

            <div className="space-y-8 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-general-white mb-4 leading-tight">
                  Start for free.
                </h2>
                <h2 className="text-4xl md:text-5xl font-bold text-general-white mb-10 leading-tight">
                  Stay in control.
                </h2>
                <p className="text-lg text-gray-text mb-8 leading-relaxed">
                  We also work with insurance providers and employer health
                  plans to make your care even more affordable. Our HMO partners
                  include AXA Mansard, Reliance, Leadway, BUPA and Allianz.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Image
                  src="/images/AXA_Mansard.png"
                  alt="AXA Mansard"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
                <Image
                  src="/images/reliance.png"
                  alt="Reliance"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
                <Image
                  src="/images/leadway.png"
                  alt="Leadway"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
                <Image
                  src="/images/Allianz-1.png"
                  alt="Allianz"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
                <Image
                  src="/images/bupa.png"
                  alt="BUPA"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
