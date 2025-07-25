"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Minus, MoveRight, MoveLeft } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonComponent from "./Button";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: number;
  text: string;
  author: string;
  rating: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const reviews: Review[] = [
  {
    id: 1,
    text: "An amazing women's health centre in Lagos. Débbo Africa is a classic example of when we get things right in Nigeria.",
    author: "Abiola O.",
    rating: 5,
  },
  {
    id: 2,
    text: "The virtual consultations are incredibly convenient and the doctors are very knowledgeable about women's health issues.",
    author: "Funmi A.",
    rating: 5,
  },
  {
    id: 3,
    text: "Finally, a healthcare platform that truly understands African women's health needs. Highly recommended!",
    author: "Kemi S.",
    rating: 5,
  },
];

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "What is DébboAfrica?",
    answer:
      "A digital women's health platform designed by and for African women. We offer AI-powered triage, virtual doctor consults, diagnostics, and health education tailored to you.",
  },
  {
    id: 2,
    question: "Who can use Débbo Africa's services?",
    answer:
      "Débbo Africa is designed for all women, particularly African women who want access to quality healthcare services. Our platform caters to women of all ages and health needs.",
  },
  {
    id: 3,
    question: "Is MyDébbo app free?",
    answer:
      "Yes, the MyDébbo app is free to download and use. Some premium features and consultations may require payment, but basic health tracking and educational content are completely free.",
  },
  {
    id: 4,
    question: "What does the AI triage tool do?",
    answer:
      "Our AI triage tool helps assess your symptoms and provides personalized health recommendations. It guides you to the right level of care and helps you understand when to seek immediate medical attention.",
  },
  {
    id: 5,
    question: "How does the MyDébbo app work for me?",
    answer:
      "The app provides personalized health tracking, symptom assessment, virtual consultations with healthcare providers, educational content, and connects you with local healthcare services when needed.",
  },
];

export const FAQSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(1);

  const sectionRef = useRef(null);
  const reviewCardRef = useRef(null);
  const mediaLogosCardRef = useRef(null);
  const faqCardRef = useRef(null);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  useEffect(() => {
    const cardsToAnimate: any = [];
    if (reviewCardRef.current) cardsToAnimate.push(reviewCardRef.current);
    if (mediaLogosCardRef.current)
      cardsToAnimate.push(mediaLogosCardRef.current);
    if (faqCardRef.current) cardsToAnimate.push(faqCardRef.current);

    const ctx = gsap.context(() => {
      gsap.from(cardsToAnimate, {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom top",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-cover bg-top bg-no-repeat bg-[url('/images/faq-background-small.png')] md:bg-[url('/images/faq-background.png')]" />
      <div className="relative z-10 min-h-screen flex items-end pb-16 px-4 pt-[28rem] md:pt-[25rem]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <div className="flex flex-col gap-6 h-full">
              <div
                className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 shadow-sm flex-1 flex flex-col"
                ref={reviewCardRef}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="images/trustpilot.svg"
                      alt="truestpilot"
                      width={100}
                      height={40}
                    />{" "}
                    <p className="text-sm ">
                      99% of clients rated our health <br /> services as
                      'Excellent'
                    </p>
                  </div>
                </div>
                {/* Review Content - Takes remaining space */}
                <div className="flex-1 flex flex-col justify-center mb-6">
                  <p className="text-base text-gray-800 leading-relaxed mb-3">
                    "{reviews[currentReview].text}"
                  </p>
                  <p className="text-sm font-medium text-gray-600 mb-4">
                    {reviews[currentReview].author}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevReview}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Previous review"
                    >
                      <MoveLeft className="w-6 h-6 text-gray-600 bg-[#FFF8F04D] p-1 rounded-full" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Next review"
                    >
                      <MoveRight className="w-6 h-6 text-gray-600 bg-[#FFF8F04D] p-1 rounded-full " />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="bg-white/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 shadow-sm"
                ref={mediaLogosCardRef}
              >
                <p className="text-xs text-gray-600 mb-3">As Seen In</p>
                <div className="flex items-center">
                  <img
                    src="/images/media-logos.png"
                    alt="Media logos - BusinessDay, Pulse, BellaNaija"
                    className="w-full max-w-xs h-auto"
                  />
                </div>
              </div>
            </div>
            <div
              className="bg-white/60 backdrop-blur-sm rounded-2xl  md:rounded-3xl p-6 shadow-sm flex flex-col h-full"
              ref={faqCardRef}
            >
              <div className="text-left mb-6">
                <h2 className="text-2xl font-bold text-general-black mb-1">
                  Frequently Asked
                </h2>
                <h2 className="text-2xl font-bold text-general-black">
                  Questions
                </h2>
              </div>
              <div className="space-y-2 mb-6 flex-1">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="rounded-lg overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between transition-colors "
                    >
                      <span className="font-medium text-general-black text-sm pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 ">
                        {openFAQ === faq.id ? (
                          <Minus className="w-6 h-6 text-white bg-[#0D0D0DFC] p-1 rounded-full" />
                        ) : (
                          <Plus className="w-6 h-6 text-gray-600 bg-[#FFF8F04D] p-1 rounded-full" />
                        )}
                      </div>
                    </button>
                    {openFAQ === faq.id && (
                      <div className="px-4 pb-3 border-t border-gray-100 ">
                        <p className="text-gray-700 text-sm leading-relaxed pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <ButtonComponent
                  text="View all FAQs"
                  className="w-full md:w-fit justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
