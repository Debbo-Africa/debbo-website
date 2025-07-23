"use client";
import { useEffect, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHero } from "@/components/page-hero";
import { TestHeader } from "@/components/test-header";
import { TestCard } from "@/components/test-card";
import { Pagination } from "@/components/pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import client from "@/lib/contentful";
import type { MedicalTestEntry, MedicalTestSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SkeletonTestCard } from "@/components/skeleton-test-card";
import { Tabs } from "@/components/tabs";
import { LetsWorkTogetherSection } from "@/components/lets-work-together";
import WideningAccessSection from "@/components/widening-access-section";

const ITEMS_PER_PAGE = 6;

const tabContent = {
  women: {
    title: "Women's Health Test",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae sem placerat. In id cursus mi pretium tellus duis convallis.",
    imageSrc: "/images/teams-hero.png",
  },
  sexual: {
    title: "Sexual Health Test",
    description:
      "Sexual health is a vital part of overall wellbeing. We offer discreet testing for common sexually transmitted infections (STIs), along with expert support and private counselling.",
    imageSrc: "/images/teams-hero.png",
  },
  general: {
    title: "General Health Test",
    description:
      "Our general health tests cover vital areas like blood sugar, cholesterol, liver and kidney function, and more. Whether you're doing a routine check-up or feeling fresh, early testing helps with prevention and peace of mind.",
    imageSrc: "/images/teams-hero.png",
  },
  occupational: {
    title: "Occupational Health Test",
    description:
      "We offer pre-employment health screening for corporate employees, domestic staff, and food handlers. Ensure your team starts strong with reliable, efficient medical checks tailored to your organisation's needs.",
    imageSrc: "/images/teams-hero.png",
  },
};

const tabMap = {
  women: "Women’s Health",
  sexual: "Sexual Health",
  general: "General Health",
  occupational: "Occupational Health",
};

// Helper function to extract text from Contentful Rich Text or return string directly
function extractRichTextValue(richText: any): string {
  if (typeof richText === "string") {
    return richText.trim();
  }
  if (!richText || !richText.content) return "";
  let fullText = "";
  richText.content.forEach((node: any) => {
    if (node.nodeType === "paragraph" && node.content) {
      node.content.forEach((textNode: any) => {
        if (textNode.nodeType === "text" && textNode.value) {
          fullText += textNode.value;
        }
      });
    }
  });
  return fullText.trim();
}

export default function BookTestPage() {
  const [activeTab, setActiveTab] = useState("women");
  const [tests, setTests] = useState<MedicalTestEntry[]>([]);
  const [filteredTests, setFilteredTests] = useState<MedicalTestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [categoryInfoMap, setCategoryInfoMap] = useState<
    Record<string, string>
  >({}); // State for category info

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const entries: EntryCollection<MedicalTestSkeleton> =
          await client.getEntries<MedicalTestSkeleton>({
            content_type: "medicalTest",
            limit: 1000, // Fetch up to 1000 items to get all category info
          });
        console.log(entries)
        const testEntries = entries.items as MedicalTestEntry[];
        setTests(testEntries);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  useEffect(() => {
    if (tests.length === 0) return;

    const testsForCurrentTab = tests.filter(
      (test) => test.fields.type === tabMap[activeTab as keyof typeof tabMap]
    );

    const categoriesForTab = new Set<string>();
    const newCategoryInfoMap: Record<string, string> = {};

    testsForCurrentTab.forEach((test) => {
      if (test.fields.category) {
        categoriesForTab.add(test.fields.category);
        // Store categoryInfo if it exists and is not already set for this category
        if (
          (test as any).fields.categoryInfo &&
          !newCategoryInfoMap[test.fields.category]
        ) {
          const infoText = extractRichTextValue((test as any).fields.categoryInfo);
          if (infoText) {
            newCategoryInfoMap[test.fields.category] = infoText;
          }
        }
      }
    });

    setAvailableCategories(Array.from(categoriesForTab));
    setCategoryInfoMap(newCategoryInfoMap); // Set the new map
    setSelectedCategory("all");
    setCurrentPage(1);
  }, [tests, activeTab]);

  useEffect(() => {
    if (tests.length === 0) return;
    const testsForCurrentTab = tests.filter(
      (test) => test.fields.type === tabMap[activeTab as keyof typeof tabMap]
    );
    const filtered = testsForCurrentTab.filter((test) => {
      const matchesSearch = test.fields.testName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || test.fields.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredTests(filtered);
    setCurrentPage(1);
  }, [tests, activeTab, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTests = filteredTests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const currentTabContent = tabContent[activeTab as keyof typeof tabContent];

  if (activeTab === "occupational") {
    return (
      <div className="min-h-screen pt-20">
        <TestHeader showTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Book a Test" }]}
        />
        <PageHero
          title={currentTabContent.title}
          description={currentTabContent.description}
          imageSrc={currentTabContent.imageSrc}
          imageAlt={`${currentTabContent.title} illustration`}
        />
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 rounded-xl overflow-hidden">
              <Image
                src="/images/hero-grid.png"
                alt="Corporate wellness team"
                width={600}
                height={400}
                className="rounded-lg w-full transform transition duration-500 hover:scale-105"
                priority
              />
            </div>
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-black mb-6">
                <span className="text-yellow">Empowering</span>&nbsp;Your <br />{" "}
                Workforce with <br /> Better Health
              </h1>
              <p className="text-lg text-body-text-gray mb-6">
                At DébboAfrica, we believe your team is your greatest asset. Our
                corporate wellness plans are designed to support employee
                health, boost productivity, and build stronger organisations.
              </p>
              <Button className="bg-[#0D0D0DFC] rounded-full">
                Explore →{" "}
              </Button>
            </div>
          </div>
        </section>
        <LetsWorkTogetherSection
          title="​​Looking for a specific test?"
          description="While we offer test panels for convenience, you can also request individual tests. Just get in touch with us to order."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <TestHeader showTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Book a Test" }]}
      />
      <PageHero
        title={currentTabContent.title}
        description={currentTabContent.description}
        imageSrc={currentTabContent.imageSrc}
        imageAlt={`${currentTabContent.title} illustration`}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-4 flex-1">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-body-text-gray w-4 h-4" />
              <Input
                placeholder="Search Test"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:max-w-xs bg-[--surface-card] border-none focus:outline-none focus:border-none"
              />
            </div>
            {activeTab === "women" ? (
              <Tabs
                tabs={[
                  { key: "all", label: "All", content: null },
                  ...availableCategories.map((category) => ({
                    key: category,
                    label: category,
                    content: null,
                    infoContent: categoryInfoMap[category], 
                  })),
                ]}
                activeTab={selectedCategory}
                setActiveTab={setSelectedCategory}
                className="w-full md:w-auto mt-4"
              />
            ) : (
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-48 bg-[--surface-card]">
                  <SelectValue placeholder="All category" />
                </SelectTrigger>
                <SelectContent className="bg-[--surface-card]">
                  <SelectItem value="all">All Categories</SelectItem>
                  {availableCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="hover:bg-[#D9D0C6]"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="hidden md:block">
            <Select defaultValue="high-to-low">
              <SelectTrigger className="w-full md:w-48 bg-[--surface-card]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[--surface-card]">
                <SelectItem value="high-to-low">High to Low</SelectItem>
                <SelectItem value="low-to-high">Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <SkeletonTestCard key={index} />
              ))
            : paginatedTests.map((test) => (
                <TestCard key={test.sys.id} test={test} />
              ))}
        </div>
        {!loading && filteredTests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No tests found matching your criteria.
            </p>
          </div>
        )}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {activeTab === "women" && (
        <>
          <WideningAccessSection
            buttonText="Contact Us "
            imageSrc="/images/couple.jpg"
            title=""
            description1="We also offer fertility testing for men, helping couples get a complete picture of their reproductive health. Contact Us to learn more."
            description2=""
            imageStyle="md:h-[320px]"
          />
          <LetsWorkTogetherSection
            test
            title="​​Looking for a specific test?"
            description="While we offer test panels for convenience, you can also request individual tests. Just get in touch with us to order."
          />
        </>
      )}
      {activeTab === "sexual" && (
        <>
          <WideningAccessSection
            buttonText="Explore "
            imageSrc="/images/test.jpg"
            title="Thinking About the Future Together?"
            description1="We also offer pre-marital health packages for couples who want to take a proactive step toward their future. These packages include essential screenings such as genotype testing, helping you make informed decisions together.

"
            description2="To learn more about our sexual health and pre-marital screening options, contact us today."
          />
          <LetsWorkTogetherSection
            test
            title="​​Looking for a specific test?"
            description="While we offer test panels for convenience, you can also request individual tests. Just get in touch with us to order."
          />
        </>
      )}
      {activeTab === "general" && (
        <>
          <LetsWorkTogetherSection
            title="​​Looking for a specific test?"
            description="While we offer test panels for convenience, you can also request individual tests. Just get in touch with us to order."
          />
        </>
      )}
    </div>
  );
}
