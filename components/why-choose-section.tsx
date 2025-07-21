"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const features = [
    {
      id: 1,
      icon: "/images/credible.svg",
      title: "Credible",
      description:
        "Everything we do is grounded in evidence and reviewed by doctors, because your care deserves nothing less.",
    },
    {
      id: 2,
      icon: "/images/convenient.svg",
      title: "Convenient",
      description:
        "Schedule virtual consultations with gynaecologists/other medical specialists, book blood tests, and get health answers, all from your phone. Home or clinic options available.",
    },
    {
      id: 3,
      icon: "/images/features.svg",
      title: "Comprehensive",
      description:
        "From your first symptom to your follow-up plan, we're with you every step of the way. No loose ends, no guesswork.",
    },
    {
      id: 4,
      icon: "/images/compliant.svg",
      title: "Compliant",
      description:
        "Our HEFAMAA-certified medical laboratory adheres to the highest clinical standards. We are Nigerian Data Protection Regulation (NDPR) compliant, and follow data protection best practices to ensure that your health information is safe and secure.",
    },
    {
      id: 5,
      icon: "/images/culurally-competent.svg",
      title: "Culturally Competent",
      description:
        "At Débbo Africa, our tech-enabled care is not just evidence-based, it's designed by African women, for African women.\n\nWe listen without judgment and deliver care that fits around your life, on your terms, and in your time. We see you, we hear you, and we're here for you.",
    },
  ];

  useEffect(() => {
    gsap.from(cardsRef.current, {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom top",
        toggleActions: "play none none none",
        once: true,
      },
    });

    cardsRef.current.forEach((card:any) => {
      (gsap as any).to(card, {
        scale: 1.03,
        duration: 0.3,
        ease: "power1.out",
        paused: true,
        onReverseComplete: () => gsap.set(card, { clearProps: "scale" }), 
      }).revert = () => {
        gsap?.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
      };

      card.addEventListener("mouseenter", () => {
        gsap?.to(card, { scale: 1.03, duration: 0.3, ease: "power1.out" });
      });
      card?.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cardsRef.current.forEach((card:any) => {
        card.removeEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power1.out" });
        });
        card.removeEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
        });
      });
    };
  }, []);

  return (
    <section className="py-16 px-4" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-general-black">
            Why Choose DébboAfrica
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {features.slice(0, 3).map((feature, index) => (
            <div
              key={feature.id}
              ref={(el:any) => ((cardsRef as any).current[index] = el)}
              className="bg-[--surface-card] rounded-2xl p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={feature.icon || "/placeholder.svg"}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h3 className="text-xl font-bold text-general-black">
                  {feature.title}
                </h3>
              </div>
              <div className=" text-md leading-relaxed space-y-4">
                {feature.description.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {features.slice(3).map((feature, index) => (
            <div
              key={feature.id}
              ref={(el:any) => ((cardsRef as any).current[index + 3] = el)} 
              className="bg-[--surface-card] rounded-2xl p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={feature.icon || "/placeholder.svg"}
                  alt={feature.title}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <h3 className="text-xl font-bold text-general-black">
                  {feature.title}
                </h3>
              </div>
              <div className=" text-md leading-relaxed space-y-4">
                {feature.description.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
