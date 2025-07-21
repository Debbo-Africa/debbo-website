"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const SERVICES_DATA = [
  {
    icon: "/images/health-risk-assessment.svg",
    title: "Health Risk Assessments",
    description:
      "Company-wide health insights with individual follow-up support.",
  },
  {
    icon: "/images/health-seminar.svg",
    title: "Onsite + Virtual Health Seminars",
    description: "Led by trusted clinicians.",
  },
  {
    icon: "/images/mobile-app.svg",
    title: "Access to the MyDébbo App",
    description:
      "Virtual consultations, lab tests & scans, health tracking, and more.",
  },
  {
    icon: "/images/preventive-screening.svg",
    title: "Preventive Screening Initiatives",
    description:
      "Including reproductive health, non-communicable diseases, and lifestyle-related conditions.",
  },
  {
    icon: "/images/wellness-plan.svg",
    title: "Tailored Wellness Plans",
    description:
      "Customised packages aligned with company goals and employee demographics.",
  },
];

export function PersonalisedCareSection() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-8" ref={cardsContainerRef}>
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Access Personalised Care.
            <br />
            Wherever you are.
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our corporate wellness plans are designed to meet the unique needs
            of African women in the workplace, while also supporting the wider
            team's physical, mental, and emotional health.
          </p>
        </div>

        {/* Large screens: 3 columns then 2 columns */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 mb-6">
          {SERVICES_DATA.slice(0, 3).map((service, index) => (
            <CardItem key={index} service={service} />
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mb-6">
          {SERVICES_DATA.slice(3, 5).map((service, index) => (
            <CardItem key={index + 3} service={service} />
          ))}
        </div>

        {/* Medium screens */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
          {SERVICES_DATA.slice(0, 4).map((service, index) => (
            <CardItem key={index} service={service} />
          ))}
        </div>
        {SERVICES_DATA[4] && (
          <div className="hidden md:block lg:hidden mt-6">
            <CardItem service={SERVICES_DATA[4]} />
          </div>
        )}

        {/* Small screens */}
        <div className="grid grid-cols-1 md:hidden gap-6">
          {SERVICES_DATA.map((service, index) => (
            <CardItem key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Service = {
  icon: string;
  title: string;
  description: string;
};

function CardItem({ service }: { service: Service }) {
  return (
    <div className="service-card rounded-xl bg-[--surface-card] p-10 min-h-[120px] ">
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-shrink-0">
          <Image
            src={service.icon}
            alt={service.title}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        <h3 className=" text-general-black font-bold">{service.title}</h3>
      </div>
      <p className="text-body-gray-text text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}
