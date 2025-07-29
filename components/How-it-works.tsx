"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Triage",
    description:
      "Our AI-powered tool helps guide you to the right care quickly and safely.",
    images: ["/images/triage-phone.png"],
    alt: "Triage phone interface",
    background: "bg-[--surface-card]",
  },
  {
    id: 2,
    title: "Consult",
    description: "Speak with licensed doctors virtually or in person.",
    images: ["/images/doctor.png"],
    alt: "Consult phone interface",
  },
  {
    id: 3,
    title: "Act",
    description:
      "Need a lab test or scan? We come to you, or you can visit our  facility.",
    images: ["/images/act-microscope.png"],
    alt: "Lab test image",
  },
  {
    id: 4,
    title: "Support",
    description:
      "Stay on top of your health with personalised reminders and educational content tailored to you.",
    images: ["/images/consult-phone.png"],
    alt: "Support care image",
  },
];

export default function HorizontalProcessSection() {
  const sectionRef = useRef(null);
  const cardRefs: any = useRef([]);
  const imageContainerRefs: any = useRef([]);

  useEffect(() => {
    gsap.from(cardRefs.current, {
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

    cardRefs.current.forEach((cardElement: any, index: any) => {
      const imageContainers = imageContainerRefs.current[index] || [];
      imageContainers.forEach((imageContainer: any) => {
        if (cardElement && imageContainer) {
          cardElement.addEventListener("mouseenter", () => {
            gsap.to(imageContainer, {
              scale: 1.05,
              duration: 0.3,
              ease: "power1.out",
            });
          });
          cardElement.addEventListener("mouseleave", () => {
            gsap.to(imageContainer, {
              scale: 1,
              duration: 0.3,
              ease: "power1.out",
            });
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cardRefs.current.forEach((cardElement: any, index: any) => {
        const imageContainers = imageContainerRefs.current[index] || [];
        imageContainers.forEach((imageContainer: any) => {
          if (cardElement && imageContainer) {
            cardElement.removeEventListener("mouseenter", () => {
              gsap.to(imageContainer, {
                scale: 1.05,
                duration: 0.3,
                ease: "power1.out",
              });
            });
            cardElement.removeEventListener("mouseleave", () => {
              gsap.to(imageContainer, {
                scale: 1,
                duration: 0.3,
                ease: "power1.out",
              });
            });
          }
        });
      });
    };
  }, []);

  return (
    <section className="py-16 px-4 md:px-8" ref={sectionRef}>
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-general-black mb-6 leading-tight">
          Discover the seamless process behind our approach.
        </h2>
        <p className="text-lg text-body-text-gray leading-relaxed">
          Every woman&apos;s health story is different. We&apos;re here to
          support your journey through our free AI-powered mobile app, a digital
          health companion thoughtfully guided by doctors who care.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el: any) => (cardRefs.current[index] = el)}
            className={`rounded-3xl overflow-hidden text-center pb-0 p-6 md:p-8 lg:pb-0 flex flex-col h-full ${
              card.background || "bg-[--surface-card]"
            }`}
          >
            {(card.title || card.description) && (
              <div className="mb-6 max-w-xs mx-auto">
                {card.title && (
                  <h3 className="text-2xl font-bold text-general-black mb-2">
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <p className="text-base text-body-text-gray leading-tight mb-8 md:mb-0">
                    {card.description}
                  </p>
                )}
              </div>
            )}

            {card.images && card.images.length > 0 && (
              <div className="flex flex-col gap-4 mt-auto">
                {card.images.map((imgSrc, imgIdx) => (
                  <div
                    key={imgIdx}
                    ref={(el: any) => {
                      if (!imageContainerRefs.current[index]) {
                        imageContainerRefs.current[index] = [];
                      }
                      imageContainerRefs.current[index][imgIdx] = el;
                    }}
                    className="w-full relative h-[350px] max-w-sm mx-auto rounded-t-2xl"
                  >
                    <Image
                      src={imgSrc || "/placeholder.svg"}
                      alt={card.alt || `Card image ${imgIdx + 1}`}
                      fill
                      className="object-contain rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-[--surface-card] mt-4 gap-2 mb-10 md:mb-12 p-4 px-4 flex mx-auto justify-center items-center rounded-full w-fit">
        <Image
          src="/images/medical-badge.svg"
          alt="Medical certification"
          width={16}
          height={16}
        />
        <p className="text-body-text-gray text-sm">
          Built with your health data privacy in mind.
        </p>
      </div>
    </section>
  );
}
