"use client";

import Image from "next/image";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <section className="pb-16">
      <div className="mx-auto px-2 lg:px-0">
        <div className="rounded-3xl overflow-hidden bg-[#FF9B33] bg-[url('/images/sharps2.png')] md:bg-[url('/images/sharps5.png')]  lg:bg-[url('/images/sharps-5.png')]">
          <div className="flex flex-col md:flex-row items-center min-h-[450px] md:min-h-[420px]">
            <div className="p-8 text-center md:text-left lg:p-12 text-white flex-1">
              <span className="font-bold mb-6 rounded-full px-3 py-1 bg-[#FFF5E94D]">
                Coming Soon
              </span>
              <h3 className="text-lg mt-6 md:text-3xl  leading-relaxed mb-8 max-w-[16rem]">
                You’ll soon be able to book scans and access reports directly in
                the MyDébbo app.
              </h3>
            </div>

            <div className="flex-1 w-full relative">
              <Image
                src="/images/coming-soon.png"
                alt="Download App"
                width={300}
                height={600}
                className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-60 lg:w-[45rem] -translate-y-1/2  lg:-bottom-[14rem] lg:translate-y-0"
              />
              <Image
                src="/images/coming-soon.png"
                alt="Download App"
                width={300}
                height={600}
                className="block md:hidden absolute right-0 bottom-0 w-[20rem] h-auto"
              />
              <Image
                src="/images/coming-soon1.png"
                alt="Download App"
                width={300}
                height={600}
                className="hidden md:block lg:hidden absolute right-0 -bottom-[14rem] w-[20rem] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
