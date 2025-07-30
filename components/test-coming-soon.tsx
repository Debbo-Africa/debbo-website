import Image from "next/image";
import React from "react";
import ButtonComponent from "./Button";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start">
        <div className="overflow-hidden min-h-[245px]  md:min-h-[445px] text-center rounded-3xl bg-secondary-debbo1 group p-6 pb-0">
          <span className="text-white bg-[#FFF5E94D]  w-fit mx-auto px-3 py-1 text-sm md:text-md rounded-full font-semibold mb-6">
            Coming Soon
          </span>
          <p className="text-white/90 leading-relaxed max-w-xs mx-auto mb-6 mt-4">
            Book tests and view results directly in the MyDébbo app
          </p>

          <div className="w-full h-60 md:h-80 relative mx-auto">
            <Image
              src="/images/book-test-mockup.png"
              alt="Book tests phone mockup"
              fill
              className="object-contain transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100"
            />
          </div>
        </div>

        <div className="overflow-hidden md:bg-[url('/images/coming-soon-bg.png')] bg-cover bg-center rounded-3xl p-6 pb-0  md:min-h-[455px]">
          <div className="flex flex-col items-center md:items-start justify-between h-full text-center md:text-left ">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 max-w-xs md:text-white text-general-black">
                Access Your Test Results
              </h2>
              <p className="md:text-white text-body-text-gray leading-relaxed max-w-xs mb-6 ">
                Log in to our secure patient portal to view your results
                anytime, anywhere.
              </p>
            </div>
            <Link href="https://celldiagnosticslimited.com/login/" target="_blank" >
              <ButtonComponent
                text="Login Now"
                linkTo=""
                className="w-fit md:mt-32 "
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
