"use client";

import { useEffect, useState, useRef } from "react";
import { Minus, Plus } from "lucide-react";
import gsap from "gsap";

import client from "@/lib/contentful"; 
import type { FaqEntry, FaqSkeleton } from "@/types/contentful"; 
import type { EntryCollection } from "contentful";

import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb"; 
import { PageHero } from "@/components/page-hero"; 

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const iconContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const entries: EntryCollection<FaqSkeleton> =
          await client.getEntries<FaqSkeleton>({
            content_type: "faqs",
            order: "sys.createdAt" as any,
          });
        setFaqs(entries.items as FaqEntry[]);
        const uniqueCategories = Array.from(
          new Set(entries.items.map((faq) => faq.fields.category))
        );
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0] as any);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const categories = Array.from(
    new Set(faqs.map((faq) => faq.fields.category))
  );

  const filteredFaqs = faqs.filter(
    (faq) => faq.fields.category === selectedCategory
  );

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  useEffect(() => {
    filteredFaqs.forEach((faq) => {
      const answerEl = answerRefs.current[faq.sys.id];
      const iconContainerEl = iconContainerRefs.current[faq.sys.id];

      if (!answerEl || !iconContainerEl) return;

      const plusIcon = iconContainerEl.querySelector(".plus-icon");
      const minusIcon = iconContainerEl.querySelector(".minus-icon");

      const isOpen = expandedFaq === faq.sys.id;

      if (isOpen) {
        gsap.fromTo(
          answerEl,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
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
        gsap.to(answerEl, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
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
  }, [expandedFaq, filteredFaqs]); 

  return (
    <div className="min-h-screen mt-20 ">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <PageHero
        title="Frequently asked questions"
        description="Get to know all the most asked questions"
        imageSrc="/images/faq.png"
        imageAlt="Faqs illustration"
      />
      <div className="max-w-7xl mx-auto pb-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="rounded-lg p-6 shadow-sm">
              <div className="space-y-2">
                {loading
                  ? [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-full h-8 bg-[--surface-card] rounded animate-pulse"
                      ></div>
                    ))
                  : categories.map((category) => {
                      const isActive = selectedCategory === category;
                      return (
                        <Button
                          key={category}
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start text-left ${
                            isActive
                              ? "bg-[--surface-card] text-general-black hover:bg-[--surface-card] hover:text-general-black"
                              : "text-body-gray-text hover:bg-[--surface-card] hover:text-general-black"
                          }`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-extrabold text-general-black">
                  {selectedCategory}
                </h2>
              </div>
              <div className="divide-y">
                {loading ? (
                  <FaqSkeletonLoader />
                ) : filteredFaqs.length === 0 ? (
                  <div className="p-6 text-center text-gray-text">
                    No FAQs found for this category.
                  </div>
                ) : (
                  filteredFaqs.map((faq) => {
                    const isOpen = expandedFaq === faq.sys.id;
                    return (
                      <div key={faq.sys.id} className="p-6">
                        <button
                          className="w-full flex items-center justify-between text-left"
                          onClick={() => toggleFaq(faq.sys.id)}
                        >
                          <h3 className="text-lg font-semibold text-general-black pr-4">
                            {faq.fields.question}
                          </h3>
                          <div
                            ref={(el:any) =>
                              (iconContainerRefs.current[faq.sys.id] = el)
                            }
                            className="relative h-8 w-8 flex-shrink-0 flex items-center justify-center"
                          >
                            <Plus className="plus-icon absolute w-4 h-4 text-body-gray-text" />
                            <Minus
                              className="minus-icon absolute w-4 h-4 bg-black text-white rounded-full"
                              style={{ opacity: isOpen ? 1 : 0 }} 
                            />
                          </div>
                        </button>
                        <div
                          ref={(el:any) => (answerRefs.current[faq.sys.id] = el)}
                          className="overflow-hidden"
                          style={{
                            height: isOpen ? "auto" : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          <p className="text-body-gray-text leading-relaxed mt-4 pt-4">
                            {faq.fields.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqSkeletonLoader() {
  return (
    <div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 animate-pulse">
          <div className="w-3/4 bg-[--surface-card] h-4 rounded mb-2"></div>
          <div className="w-full bg-[--surface-card] h-4 rounded"></div>
        </div>
      ))}
    </div>
  );
}
