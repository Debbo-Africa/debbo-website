"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, Star } from "lucide-react";

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

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-top bg-no-repeat bg-[url('/images/faq-background-small.png')] md:bg-[url('/images/faq-background.png')]" />

      <div className="relative z-10 min-h-screen flex items-end pb-16 px-4 pt-[28rem] md:pt-[25rem]">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Left Column - Two Cards with Matching Height */}
            <div className="flex flex-col gap-6 h-full">
              {/* Trustpilot & Review Card - Expandable */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex-1 flex flex-col">
                {/* Trustpilot Rating */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-green-600 fill-green-600" />
                    <div className="text-xs font-medium text-gray-600">
                      Trustpilot
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center"
                      >
                        <span className="text-white text-xs">★</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-700">
                    <span className="font-semibold">99%</span> of clients rated
                    our health services as 'Excellent'
                  </p>
                </div>

                {/* Review Content - Takes remaining space */}
                <div className="flex-1 flex flex-col justify-center mb-6">
                  <p className="text-base text-gray-800 leading-relaxed mb-3">
                    "{reviews[currentReview].text}"
                  </p>
                  <p className="text-sm font-medium text-gray-600 mb-4">
                    {reviews[currentReview].author}
                  </p>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevReview}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={nextReview}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Media Logos Card - Fixed Height */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
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

            {/* Right Column - FAQ */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col h-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Frequently Asked
                </h2>
                <h2 className="text-2xl font-bold text-gray-900">Questions</h2>
              </div>

              {/* FAQ Items */}
              <div className="space-y-2 mb-6 flex-1">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="rounded-lg overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between transition-colors"
                    >
                      <span className="font-medium text-gray-900 text-sm pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0">
                        {openFAQ === faq.id ? (
                          <Minus className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Plus className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    </button>

                    {openFAQ === faq.id && (
                      <div className="px-4 pb-3 border-t border-gray-100">
                        <p className="text-gray-700 text-sm leading-relaxed pt-3">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* View All FAQs Button */}
              <div className="text-left">
                <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2 text-sm">
                  View all FAQs
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
