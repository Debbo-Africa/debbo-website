"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function TrustedBySection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8 lg:max-w-[15rem] md:leading-loose">
              Trusted by Leading Employers
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We're proud to partner with forward-thinking companies like:
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <Image
                  src="/images/fmn.svg"
                  alt="FMN Logo"
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/tajbank.svg"
                  alt="TAJBank Logo"
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/ihs.svg"
                  alt="IHS Logo"
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/trustpilot.svg"
                alt="Trustpilot"
                width={100}
                height={60}
                className="h-10 w-auto"
              />
              <p className="text-sm text-gray-600">
                100% of our clients and partners have indicated they would reuse
                or recommend our services.
              </p>
            </div>
          </div>

          <div className="flex">
            <Card className="relative rounded-3xl md:rounded-3xl bg-yellow border-none text-white flex flex-col justify-center w-full md:p-20">
              {/* Background Image */}
              <Image
                src="/images/trusted-bg.png"
                alt="Trusted NG Background"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl "
              />

              <CardContent className="relative p-8 z-10 ">
                <h3 className="text-lg lg:text-2xl leading-relaxed mb-6">
                  "The screening exercise was not only thorough but also handled
                  with professionalism and care. The attention to detail and the
                  support provided to each participant was impressive..."
                </h3>
                <span className=" text-sm">HR Rep, FMN</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
