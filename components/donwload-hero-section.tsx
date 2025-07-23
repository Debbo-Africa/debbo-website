"use client";

import Image from "next/image";

const DonwloadHeroSection = () => {
  return (
    <section className="w-full md:px-4  rounded-2xl overflow-hidden lg:max-w-7xl mx-auto ">
      <div className="hidden md:flex relative w-full h-[500px] aspect-[4/3]">
        <Image
          src="/images/hero-bg-large.png"
          alt="Health app background"
          fill
          priority
        />
        <div className="relative z-10 flex items-center justify-between w-full px-16">
          <div className="max-w-md text-general-white space-y-6">
            <h2 className="text-4xl font-bold leading-snug">
              Health and Wellness made Simple and Tailored to you
            </h2>
            <p className="text-base">
              Your personal health companion, designed with you in mind. With
              the MyDébbo app, you can track symptoms, access virtual care, book
              scans, and manage lab tests, all from your phone.
            </p>
            <div className="flex gap-4">
              <Image
                src="/images/playstore-large.svg"
                alt="Play Store"
                width={140}
                height={45}
                className="h-auto w-auto"
              />
              <Image
                src="/images/appstore-large.svg"
                alt="App Store"
                width={140}
                height={45}
                className="h-auto w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col items-center text-center px-4 py-12 space-y-6">
        <h2 className="text-3xl font-bold">
          Health and Wellness made Simple and Tailored to you
        </h2>
        <p className="text-base max-w-sm mx-auto">
          Your personal health companion, designed with you in mind. With the
          MyDébbo app, you can track symptoms, access virtual care, book scans,
          and manage lab tests, all from your phone.
        </p>
        <div className="flex gap-4 justify-center">
          <Image
            src="/images/playstore-small.svg"
            alt="Play Store"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
          <Image
            src="/images/appstore-small.svg"
            alt="App Store"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </div>
        <div className="w-full rounded-2xl overflow-hidden">
          <Image
            src="/images/hero-bg-large.png"
            alt="App preview"
            width={400}
            height={600}
            className="mx-auto rounded-2xl object-cover h-72"
          />
        </div>
      </div>
    </section>
  );
};

export default DonwloadHeroSection;
