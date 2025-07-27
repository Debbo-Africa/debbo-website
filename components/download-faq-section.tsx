"use client";
import { useState, useLayoutEffect, useRef } from "react";
import { useEffect } from "react";

import Image from "next/image";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";

const SERVICES_DATA = [
  {
    icon: "/placeholder.svg?height=32&width=32",
    title: "Health Risk Assessments",
    description:
      "Company-wide health insights with individual follow-up support.",
  },
  {
    icon: "/placeholder.svg?height=32&width=32",
    title: "Onsite + Virtual Health Seminars",
    description: "Led by trusted clinicians.",
  },
  {
    icon: "/placeholder.svg?height=32&width=32",
    title: "Access to the MyDébbo App",
    description:
      "Virtual consultations, lab tests & scans, health tracking, and more.",
  },
  {
    icon: "/placeholder.svg?height=32&width=32",
    title: "Preventive Screening Initiatives",
    description:
      "Including reproductive health, non-communicable diseases, and lifestyle-related conditions.",
  },
  {
    icon: "/placeholder.svg?height=32&width=32",
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
      <div className="max-w-7xl mx-auto px-4 lg:px-8" ref={cardsContainerRef}>
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
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, index) => (
            <CardItem key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CardItem({ service }: { service: (typeof SERVICES_DATA)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power1.out" });
    };
    const handleMouseLeave = () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="service-card rounded-xl bg-[--surface-card] p-10 min-h-[120px] cursor-pointer transform transition-transform duration-300 hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-2">
        <Image
          src={service.icon || "/placeholder.svg"}
          alt={service.title}
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <h3 className="text-general-black font-bold">{service.title}</h3>
      </div>
      <p className="text-body-gray-text text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

const steps = [
  {
    number: "1",
    title: "Download MyDébbo app",
    description: "Available on Google Play and the App Store.",
  },
  {
    number: "2",
    title: "Signup & create your profile",
    description:
      "Tell us a bit about you - your measurements, symptoms and health goals",
  },
  {
    number: "3",
    title: "Book, Track, & Connect",
    description:
      "Start booking tests, tracking your symptoms, or talk to a specialist - all from your phone.",
  },
];

const faqs = [
  {
    question: "Is the app free to use?",
    answer:
      "Yes! Downloading and exploring the app is completely free. You only pay for booked services like tests or consultations.",
  },
  {
    question: "Can I use the app from outside Nigeria?",
    answer:
      "Yes, you can access the app from anywhere. However, some services may be location-specific.",
  },
  {
    question: "What if I don’t know which test I need?",
    answer:
      "You can consult with our specialists in the app to guide you on which tests to book.",
  },
  {
    question: "Is my information safe?",
    answer:
      "Yes. We prioritise your data security and comply with global data protection standards.",
  },
];

export default function HowItWorksAndFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconContainerRefs = useRef<(HTMLDivElement | null)[]>([]); 

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    faqs.forEach((_, index) => {
      const answerEl = answerRefs.current[index];
      const iconContainerEl = iconContainerRefs.current[index];

      if (!answerEl || !iconContainerEl) return;

      const plusIcon = iconContainerEl.querySelector(".plus-icon");
      const minusIcon = iconContainerEl.querySelector(".minus-icon");

      const isOpen = openIndex === index;

      if (isOpen) {
        // Animate answer dropdown
        gsap.fromTo(
          answerEl,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        // Animate icons
        gsap.to(plusIcon, {
          rotate: 90,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.fromTo(
          minusIcon,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.inOut" }
        );
      } else {
        // Animate answer collapse
        gsap.to(answerEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        // Animate icons
        gsap.to(plusIcon, {
          rotate: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(minusIcon, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });
  }, [openIndex]);

  // Initialize refs arrays to match the number of FAQs
  useEffect(() => {
    answerRefs.current = answerRefs.current.slice(0, faqs.length);
    iconContainerRefs.current = iconContainerRefs.current.slice(0, faqs.length);
  }, [faqs.length]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-serif text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[--surface-card] rounded-2xl p-6 text-center transform transition-transform duration-300 hover:scale-105"
            >
              <div className="text-2xl font-bold mb-2">{step.number}</div>
              <h3 className="text-lg lg:text-2xl font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-md text-body-text-gray">{step.description}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl lg:text-4xl font-serif text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="border-b border-[#f2e9dd]">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left font-medium py-4"
                >
                  <h3 className="font-bold">{faq.question}</h3>
                  <div
                    ref={(el:any) => (iconContainerRefs.current[index] = el)}
                    className="relative h-5 w-5 flex items-center justify-center"
                  >
                    <Plus className="plus-icon absolute h-5 w-5" />
                    <Minus
                      className="minus-icon absolute h-5 w-5 bg-black text-white rounded-full"
                      style={{ opacity: isOpen ? 1 : 0 }}
                    />
                  </div>
                </button>
                <div
                  ref={(el:any) => (answerRefs.current[index] = el)}
                  className="overflow-hidden"
                  style={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <p className="text-md text-body-text-gray mt-2 pb-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
