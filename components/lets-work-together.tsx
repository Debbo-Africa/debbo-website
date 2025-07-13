"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface LetsWorkTogetherProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function LetsWorkTogetherSection({
  title = "Let's Work Together",
  description = "Contact us to learn more or request a custom wellness package.",
  buttonText = "Contact Us →",
  buttonLink = "/contact",
  imageSrc = "/images/lets-wrok.png",
  imageAlt = "Team member",
}: LetsWorkTogetherProps) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="bg-green rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center min-h-[400px]">
            <div className="p-8 lg:p-12 text-white flex-1">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{title}</h2>
              <p className="text-lg opacity-90 leading-relaxed mb-8">
                {description}
              </p>
              {buttonText && buttonLink && (
                <Link href={buttonLink}>
                  <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full">
                    {buttonText}
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex-1 w-full pb-6 md:pb-0">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
