"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ButtonComponent from "./Button";

interface LetsWorkTogetherProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  download?: boolean;
  topImageSrc?: string;
  topImageAlt?: string;
  test?: boolean;
}

export function LetsWorkTogetherSection({
  title = "Let's Work Together",
  description = "Contact us to learn more or request a custom wellness package.",
  buttonText = "Contact Us ",
  buttonLink = "/contact-us",
  imageSrc = "/images/sharps.svg",
  imageAlt = "Team member",
  download = false,
  topImageSrc = "/images/download-phone.png",
  topImageAlt = "Top image",
  test = false,
}: LetsWorkTogetherProps) {
  return (
    <section className="pb-16">
      <div
        className={`${
          (!download || !test) && "max-w-7xl "
        } mx-auto px-2 lg:px-0`}
      >
        <div
          className={`rounded-3xl overflow-hidden ${
            download ? "bg-[#FA9130]" : "bg-green"
          }`}
        >
          <div
            className={`flex flex-col lg:flex-row items-center min-h-[670px] md:min-h-[400px] ${
              download && "min-h-[500px]"
            }`}
          >
            {/* Left text section */}
            <div className="p-8  text-center lg:text-left lg:p-12 text-white flex-1 ">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 max-w-[20rem]">
                {title}
              </h2>
              <p className="text-lg opacity-90 leading-relaxed mb-8 max-w-md">
                {description}
              </p>

              {download ? (
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link href="#" target="_blank">
                    <Image
                      src="/images/appstore-large.svg"
                      alt="Download on App Store"
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                    />
                  </Link>
                  <Link href="#" target="_blank">
                    <Image
                      src="/images/playstore-large.svg"
                      alt="Download on Play Store"
                      width={150}
                      height={50}
                      className="h-12 w-auto"
                    />
                  </Link>
                </div>
              ) : (
                buttonText &&
                buttonLink && (
                  <ButtonComponent text={buttonText} linkTo={buttonLink} />
                )
              )}
            </div>

            {/* Right image section */}
            <div className="flex-1 w-full relative">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />

              {topImageSrc && download && (
                <>
                  {/* Desktop / Tablet phone image */}
                  <Image
                    src={topImageSrc}
                    alt={topImageAlt}
                    width={300}
                    height={600}
                    className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-60 lg:w-[30rem] h-auto top-1/2 -translate-y-1/2 md:top-auto md:-bottom-28 lg:translate-y-0"
                  />

                  {/* Mobile phone image */}
                  <Image
                    src={topImageSrc}
                    alt={topImageAlt}
                    width={300}
                    height={600}
                    className="block md:hidden absolute right-0 bottom-0 w-[20rem] h-auto"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LetsWorkTogetherSection;
