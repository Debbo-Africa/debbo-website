"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import client from "@/lib/contentful";
import type { NewsEventsEntry, NewsEventsSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { Input } from "@/components/ui/input";
import { NewsEventCard } from "./new-event-card";
import { Pagination } from "./pagination";

const ITEMS_PER_PAGE = 20;

const LoadingCardPlaceholder = () => (
  <div className="animate-pulse flex flex-col lg:flex-row gap-4 mb-6 border rounded-lg p-4 border-[--surface-card]">
    <div className="bg-[--surface-card] rounded w-full lg:w-60 h-40"></div>
    <div className="flex-1 space-y-4">
      <div className="h-4 bg-[--surface-card] rounded w-1/3"></div>
      <div className="h-6 bg-[--surface-card] rounded w-3/4"></div>
      <div className="h-4 bg-[--surface-card] rounded w-1/2"></div>
      <div className="h-10 bg-[--surface-card] rounded w-24"></div>
    </div>
  </div>
);

export default function NewsEventsPage() {
  const [newsEvents, setNewsEvents] = useState<NewsEventsEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"News" | "Events">("News");

  useEffect(() => {
    const fetchNewsEvents = async () => {
      try {
        const entries: EntryCollection<NewsEventsSkeleton> =
          await client.getEntries<NewsEventsSkeleton>({
            content_type: "newsEvents",
            order: "-fields.event_date" as any,
          });
        setNewsEvents(entries.items as NewsEventsEntry[]);
      } catch (error) {
        console.error("Error fetching news and events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsEvents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFilteredAndPaginatedItems = (category: "News" | "Events") => {
    const filteredItems = newsEvents.filter((item) => {
      const matchesCategory = item.fields.category === category;
      const matchesSearch =
        searchQuery === "" ||
        item.fields.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.fields.tag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filteredItems.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    return { paginatedItems, totalPages, totalItems: filteredItems.length };
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab]);

  const newsData = getFilteredAndPaginatedItems("News");
  const eventsData = getFilteredAndPaginatedItems("Events");

  const currentData = activeTab === "News" ? newsData : eventsData;

  return (
    <div className="min-h-screen">
      <div className="mt-20">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "News & Event" }]}
        />

        <PageHero
          title="News & Events"
          description="Stay updated with the latest news and events happening at DébboAfrica."
          imageSrc="/images/faq.png"
          imageAlt="News & Events illustration"
        />

        <div className="max-w-7xl mx-auto pb-12 px-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex space-x-6 border-b-[0.2px] w-full">
                {["News", "Events"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as "News" | "Events")}
                    className={`pb-2 w-20 border-b-2 ${
                      activeTab === tab
                        ? "border-orange-500 text-black font-semibold"
                        : "border-transparent text-gray-500 hover:text-black"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-body-text-gray outline-none h-4 w-4" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab.toLowerCase()}`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 bg-[--surface-card] outline-none border-none"
                />
              </div>
            </div>

            <div>
              {loading ? (
                <div className="space-y-4">
                  {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                    <LoadingCardPlaceholder key={index} />
                  ))}
                </div>
              ) : currentData.paginatedItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No {activeTab.toLowerCase()} found
                    {searchQuery && ` matching "${searchQuery}"`}.
                  </p>
                </div>
              ) : (
                currentData.paginatedItems.map((item) => (
                  <NewsEventCard key={item.sys.id} item={item} layout="list" />
                ))
              )}

              {!loading && currentData.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={currentData.totalPages}
                  onPageChange={handlePageChange}
                  variant="ghost"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
