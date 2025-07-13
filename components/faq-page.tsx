"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import client from "@/lib/contentful";
import type { FaqEntry, FaqSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<FaqEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const entries: EntryCollection<FaqSkeleton> =
          await client.getEntries<FaqSkeleton>({ content_type: "faqs" });

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
              <h3 className="font-semibold text-general-black mb-4">
                Categories
              </h3>
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
                              : "text-gray-text hover:bg-[--surface-card] hover:text-general-black"
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

          {/* Main FAQ Content */}
          <div className="lg:col-span-3">
            <div className="rounded-lg shadow-sm">
              {/* Category Header */}
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-general-black">
                  {selectedCategory}
                </h2>
              </div>

              {/* FAQ List */}
              <div className="divide-y">
                {loading ? (
                  <FaqSkeletonLoader />
                ) : filteredFaqs.length === 0 ? (
                  <div className="p-6 text-center text-gray-text">
                    No FAQs found for this category.
                  </div>
                ) : (
                  filteredFaqs.map((faq) => (
                    <div key={faq.sys.id} className="p-6">
                      <button
                        className="w-full flex items-center justify-between text-left"
                        onClick={() => toggleFaq(faq.sys.id)}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.fields.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {expandedFaq === faq.sys.id ? (
                            <div className="w-8 h-8 bg-general-black rounded-full flex items-center justify-center">
                              <ChevronDown className="w-4 h-4 text-general-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8  rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                              <Plus className="w-4 h-4 text-gray-text" />
                            </div>
                          )}
                        </div>
                      </button>

                      {expandedFaq === faq.sys.id && (
                        <div className="mt-4 pt-4">
                          <p className="text-gray-text leading-relaxed">
                            {faq.fields.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
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
        <div key={i} className="p-6 bg-[--surface-card]  animate-pulse">
          <div className="w-3/4 h-4 rounded mb-2"></div>
          <div className="w-full h-4  rounded"></div>
        </div>
      ))}
    </div>
  );
}
