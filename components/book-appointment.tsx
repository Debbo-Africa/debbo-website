"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Medical Officers",
    description: "Virtual Consultations from ₦5,000",
    images: ["/images/medical-offer.png"],
    alt: "Triage phone interface",
    background: "bg-[#01AC9C]",
  },
  {
    id: 2,
    title: "Specialist Doctors",
    description: "Virtual Consultations from ₦25,000",
    images: ["/images/specailist-doctor.png"],
    alt: "Consult phone interface",
    background: "bg-[#D76441]",
  },
];

export default function BookAppointment() {
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
                duration: 0.5,
                ease: "power1.out",
              });
            });
            cardElement.removeEventListener("mouseleave", () => {
              gsap.to(imageContainer, {
                scale: 1,
                duration: 1,
                ease: "power1.out",
              });
            });
          }
        });
      });
    };
  }, []);

  return (
    <section className="py-16 " ref={sectionRef}>
      <div className="text-center mb-6 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-general-black mb-2 leading-tight">
          Book an Appointment with:
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el: any) => (cardRefs.current[index] = el)}
            className={`rounded-3xl overflow-hidden text-center pb-0  flex flex-col h-full ${
              card.background || "bg-[--surface-card]"
            }`}
          >
            {(card.title || card.description) && (
              <div className="mb-6  mx-auto pt-6">
                {card.title && (
                  <h3 className="text-2xl  font-extrabold text-general-white mb-2">
                    {card.title}
                  </h3>
                )}
                {card.description && (
                  <p className="text-base text-general-white leading-relaxed mb-8 md:mb-0 font-bold">
                    {card.description} <br />
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
                    className="w-full relative h-[260px] md:h-[330px] max-w-sm md:max-w-md mx-auto rounded-t-2xl"
                  >
                    <Image
                      src={imgSrc || "/placeholder.svg"}
                      alt={card.alt || `Card image ${imgIdx + 1}`}
                      fill
                      className="md:object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
