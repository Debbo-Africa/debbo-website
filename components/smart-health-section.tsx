"use client";

import Image from "next/image";

export function SmartHealthcareSection() {
  return (
    <section className="w-full">
      <div className="hidden md:block">
        <div className="grid grid-cols-2 h-[200px] mb-2 gap-2">
          <div className="bg-[--surface-card] p-8 lg:p-12 flex items-center justify-center rounded-r-full group relative overflow-hidden">
            <div className="text-left transition-transform duration-700 ease-in-out group-hover:-translate-x-2">
              <p className="bg-[#D9D0C6] px-3 py-1 w-fit rounded-full text-xs text-general-black mb-4">
                WHO WE ARE
              </p>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-general-black leading-tight">
                Smart Healthcare, for every African woman.
              </h2>
            </div>
          </div>
          <div className="bg-[#01AC9C] rounded-l-full relative overflow-hidden group">
            <div className="transition-transform duration-700 ease-in-out group-hover:translate-x-2 h-full w-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 h-[200px] gap-2">
          <div className="bg-[#D76441] rounded-r-3xl relative overflow-hidden group">
            <div className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-700 ease-in-out group-hover:-translate-x-2">
              <div className="relative w-56 h-56">
                <Image
                  src="/images/smiling-woman.png"
                  alt="Smiling African woman"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="bg-[--surface-card] p-6 lg:p-8 flex items-center rounded-3xl">
            <div className="text-general-black">
              <h3 className="text-base lg:text-lg leading-relaxed">
                Our mission is to close the gender health gap by delivering care
                that is accessible, rooted in science, and deeply attuned to the
                lived experiences of African women.
              </h3>
            </div>
          </div>

          <div className="bg-[#FF9B33] rounded-l-3xl relative overflow-hidden group">
            <div className="transition-transform duration-700 ease-in-out group-hover:translate-x-2 h-full w-full"></div>
          </div>
        </div>
      </div>

      <div className="block md:hidden space-y-6 p-4 ">
        <div className="bg-[--surface-card]  rounded-2xl py-10 px-4 ">
          <p className="bg-white px-3 py-1 w-fit rounded-full text-xs text-general-black mb-6 ">
            WHO WE ARE
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-general-black leading-tight  max-w-xs">
            Smart Healthcare, for every African woman.
          </h2>
        </div>

        <div className="bg-[#ef4444] rounded-2xl  flex items-center justify-center ">
          <div className="relative w-64 h-64">
            <Image
              src="/images/smiling-woman.png"
              alt="Smiling African woman"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Mission Text */}
        <div className="bg-[--surface-card] p-6 rounded-2xl ">
          <p className="text-general-black text-base leading-relaxed">
            Our mission is to close the gender health gap by delivering care
            that is accessible, rooted in science, and deeply attuned to the
            lived experiences of African women.
          </p>
        </div>
      </div>
    </section>
  );
}
