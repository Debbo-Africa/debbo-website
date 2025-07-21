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
    image: "/images/triage-phone.png",
    alt: "Triage phone interface",
  },
  {
    id: 2,
    title: "Consult",
    description: "Speak with licensed doctors virtually or in person.",
    image: "/images/doctor.png",
    alt: "Consult phone interface",
  },
  {
    id: 3,
    title: "Act",
    description:
      "Need a lab test or scan? We come to you, or you can visit our Lekki facility. All tests are reviewed by trusted clinical experts.",
    image: "/images/act-microscope.png",
    alt: "Lab test image",
  },
  {
    id: 4,
    title: "Support",
    description:
      "Care doesn't end with a test. Track results, access health reminders, join community forums, and learn from personalised content in the app.",
    image: "/images/consult-phone.png",
    alt: "Support care image",
  },
];

export default function HorizontalProcessSection() {
  const sectionRef = useRef(null);
  const cardRefs:any = useRef([]);
  const imageContainerRefs:any = useRef([]);

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

    cardRefs.current.forEach((cardElement:any, index:any) => {
      const imageContainer = imageContainerRefs.current[index];
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      cardRefs.current.forEach((cardElement:any, index:any) => {
        const imageContainer = imageContainerRefs.current[index];
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto ">
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el: any) => (cardRefs.current[index] = el)}
            className="rounded-3xl overflow-hidden text-center pb-0 p-6 md:p-8  lg:pb-0 bg-[--surface-card] flex flex-col h-full"
          >
            <div className="mb-6 max-w-xs mx-auto">
              <h3 className="text-2xl font-bold text-general-black mb-2">
                {card.title}
              </h3>
              <p className="text-base  text-body-text-gray leading-relaxed  mb-8 md:mb-0">
                {card.description}
              </p>
            </div>
            <div
              ref={(el: any) => (imageContainerRefs.current[index] = el)}
              className="w-full relative h-[350px] max-w-sm mx-auto mt-auto rounded-t-2xl"
            >
              <Image
                src={card.image || "/placeholder.svg"}
                alt={card.alt}
                fill
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-[--surface-card] mt-4  gap-2 mb-10 md:mb-12 p-4 px-4 flex mx-auto justify-center items-center rounded-full w-fit">
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
