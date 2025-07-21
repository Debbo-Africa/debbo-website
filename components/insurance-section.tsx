"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const InsuranceSection = () => {
  const sectionRef = useRef(null);
  const mobileImageElementRef = useRef(null);
  const desktopImageElementRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
          end: "bottom top",
          toggleActions: "play none none none",
          once: true,
        },
      });

      if (mobileImageElementRef.current) {
        (mobileImageElementRef as any).current?.addEventListener("mouseenter", () => {
          gsap.to(mobileImageElementRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        });
        (mobileImageElementRef as any).current?.addEventListener("mouseleave", () => {
          gsap.to(mobileImageElementRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }

      if ((desktopImageElementRef).current ) {
        (desktopImageElementRef as any).current?.addEventListener("mouseenter", () => {
          gsap.to(desktopImageElementRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        });
        (desktopImageElementRef as any).current?.addEventListener("mouseleave", () => {
          gsap.to(desktopImageElementRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }
    });

    return () => {
      ctx.revert(); 
      if (mobileImageElementRef.current) {
        (mobileImageElementRef as any).current?.removeEventListener("mouseenter", () => {
          gsap.to(mobileImageElementRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        });
        (mobileImageElementRef as any).current?.removeEventListener("mouseleave", () => {
          gsap.to(mobileImageElementRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }
      if (desktopImageElementRef.current) {
        (desktopImageElementRef as any).current?.removeEventListener("mouseenter", () => {
          gsap.to(desktopImageElementRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out",
          });
        });
        (desktopImageElementRef as any).current?.removeEventListener("mouseleave", () => {
          gsap.to(desktopImageElementRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out",
          });
        });
      }
    };
  }, []);

  return (
    <section className="py-16 px-0 " ref={sectionRef}>
      {/* Mobile */}
      <div className="block md:hidden space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-general-black mb-2 leading-tight text-center">
            Start for free.
          </h2>
          <h2 className="text-3xl font-bold text-general-black mb-4 leading-tight text-center">
            Stay in control.
          </h2>
          <p className="text-base mb-6 leading-relaxed text-center">
            We work with insurance providers and employer health plans to make
            your care even more affordable. Our HMO partners include AXA
            Mansard, Reliance, Leadway, BUPA and Allianz.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { src: "/images/AXA_Mansard.svg", alt: "AXA Mansard" },
            { src: "/images/reliance.svg", alt: "Reliance" },
            { src: "/images/leadway.svg", alt: "Leadway" },
            { src: "/images/Allianz-1.svg", alt: "Allianz" },
            { src: "/images/bupa.svg", alt: "BUPA" },
          ].map((partner) => (
            <Image
              key={partner.alt}
              src={partner.src || "/placeholder.svg"}
              alt={partner.alt}
              width={60}
              height={30}
              className="h-5 w-auto"
            />
          ))}
        </div>
        <div className="relative rounded-3xl overflow-hidden min-h-[400px] text-white">
          <Image
            src="/images/woman-smiling.png"
            alt="Smiling woman"
            fill
            className="object-cover"
            ref={mobileImageElementRef} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 z-10 text-left">
            <h3 className="text-2xl font-bold mb-1">No insurance?</h3>
            <h3 className="text-2xl font-bold mb-4">No problem.</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              We offer flexible, transparent payment options that work for you.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative rounded-3xl overflow-hidden min-h-[400px] text-white">
          <Image
            src="/images/woman-smiling.png"
            alt="Smiling woman"
            fill
            className="object-cover"
            ref={desktopImageElementRef} 
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10 max-w-xs text-general-black">
            <h3 className="text-2xl font-bold mb-1">No insurance?</h3>
            <h3 className="text-2xl font-bold mb-6">No problem.</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              We offer flexible, transparent payment options that work for you.
            </p>
          </div>
        </div>
        <div className="space-y-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-general-black mb-4 leading-tight">
              Start for free.
            </h2>
            <h2 className="text-4xl md:text-5xl font-bold text-body-text-gray mb-10 leading-tight">
              Stay in control.
            </h2>
            <p className="text-lg text-body-text-gray mb-8 leading-relaxed">
              We also work with insurance providers and employer health plans to
              make your care even more affordable. Our HMO partners include AXA
              Mansard, Reliance, Leadway, BUPA and Allianz.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { src: "/images/AXA_Mansard.svg", alt: "AXA Mansard" },
              { src: "/images/reliance.svg", alt: "Reliance" },
              { src: "/images/leadway.svg", alt: "Leadway" },
              { src: "/images/Allianz-1.svg", alt: "Allianz" },
              { src: "/images/bupa.svg", alt: "BUPA" },
            ].map((partner) => (
              <Image
                key={partner.alt}
                src={partner.src || "/placeholder.svg"}
                alt={partner.alt}
                width={80}
                height={40}
                className="h-8 w-auto"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
