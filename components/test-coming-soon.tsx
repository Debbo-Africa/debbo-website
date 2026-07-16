import Image from "next/image";
import React from "react";
import ButtonComponent from "./Button";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/app-links";

const ComingSoon = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6 items-start">
        <div className="lg:col-span-2 overflow-hidden min-h-[245px] md:min-h-[445px] text-center rounded-3xl bg-secondary-debbo1 group p-6 pb-0">
          <span className="text-white bg-[#FFF5E94D] w-fit mx-auto px-3 py-1 text-sm md:text-md rounded-full font-semibold mb-6">
            Now Live
          </span>
          <p className="text-white/90 leading-relaxed max-w-xs mx-auto mb-6 mt-4">
            Book tests and view results directly in the MyDébbo app
          </p>
          <div className="flex gap-3 justify-center mb-4">
            <Link href={APP_STORE_URL} target="_blank">
              <Image
                src="/images/appstore-large.svg"
                alt="Download on the App Store"
                width={140}
                height={45}
                className="h-11 w-auto"
              />
            </Link>
            <Link href={PLAY_STORE_URL} target="_blank">
              <Image
                src="/images/playstore-large.svg"
                alt="Get it on Google Play"
                width={140}
                height={45}
                className="h-11 w-auto"
              />
            </Link>
          </div>

          <div className="w-full h-64 md:h-80 relative mx-auto">
            <Image
              src="/images/book-test-mockup.png"
              alt="Book tests phone mockup"
              fill
              className="object-contain transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100"
            />
          </div>
        </div>

        <div className="hidden md:block lg:col-span-3 overflow-hidden rounded-3xl relative group min-h-[320px] md:min-h-[455px] p-6 pb-0">
          <div className="absolute inset-0 bg-[url('/images/coming-soon-bg.png')] bg-cover bg-center transition-transform duration-500 ease-out scale-100 group-hover:scale-105 z-0" />

          <div className="relative z-10 flex flex-col items-center md:items-start justify-between h-full text-center md:text-left">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 max-w-xs md:text-white text-general-black">
                Access Your Test Results
              </h2>
              <p className="md:text-white text-body-text-gray leading-relaxed max-w-xs mb-6">
                Register and log in to our secure patient portal to view your
                results anytime, anywhere.
              </p>
            </div>
            <Link
              href="https://celldiagnosticslimited.com/login/"
              target="_blank"
            >
              <ButtonComponent
                text="Start Now"
                linkTo=""
                className="w-fit md:mt-32"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
