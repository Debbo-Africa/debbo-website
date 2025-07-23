"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react"; 
const steps = [
  {
    number: "01",
    title: "Download MyDébbo app",
    description: "Available on Google Play and the App Store.",
  },
  {
    number: "02",
    title: "Signup & create your profile",
    description:
      "Tell us a bit about you - your measurements, symptoms and health goals",
  },
  {
    number: "03",
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-serif text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[--surface-card] rounded-2xl p-6 text-center"
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
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left font-medium text-body-text-gray py-4"
              >
                <h3 className="font-bold">{faq.question}</h3>
                {openIndex === index ? (
                  <Minus className="h-5 w-5 bg-black text-white rounded-full " />
                ) : (
                  <Plus className="h-5 w-5 " />
                )}
              </button>
              {openIndex === index && (
                <p className="text-md text-body-text-gray mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
