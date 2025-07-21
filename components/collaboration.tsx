"use client";

import React from "react";
import Image from "next/image";

const CollaborationSection = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden group">
            <Image
              src="/images/handshake.png"
              alt="Collaborative handshake"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold text-general-black mb-6">
            At Debbo Africa, we firmly believe in the transformative power of
            collaboration and the strength that arises from working together.
          </h2>
          <p className="text-body-gray-text mb-4">
            We take immense pride in partnering with like-minded brands and
            organizations that share our mission of empowering women and
            promoting holistic well-being across Africa. These alliances have
            not only shaped our journey but have also amplified our voice along
            the way.
          </p>
          <p className="text-body-gray-text mb-8">
            Our esteemed Brand Allies are true champions in their respective
            fields, dedicated to tackling global issues for the betterment of
            communities worldwide. Through our collective efforts, we aim to
            forge a united front, uplifting and supporting women on their
            transformative journey towards overall wellness.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Image
              src="/images/timon-logo.svg"
              alt="Timon Capital"
              width={70}
              height={30}
            />
            <Image
              src="/images/aseda-logo.svg"
              alt="Aseda"
              width={70}
              height={30}
            />
            <Image
              src="/images/drumrd-logo.svg"
              alt="Drumrd"
              width={70}
              height={30}
            />
            <Image
              src="/images/thecamp-logo.svg"
              alt="The Camp"
              width={70}
              height={30}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
