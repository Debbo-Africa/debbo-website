"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import client from "@/lib/contentful";
import type { NewsEventsEntry, NewsEventsSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { Tabs } from "./tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DismissibleBanner } from "./dismissable-banner";
import { NewsEventCard } from "./new-event-card";
import { Pagination } from "./pagination";

const ITEMS_PER_PAGE = 3;

export default function NewsEventsPage() {
  const [newsEvents, setNewsEvents] = useState<NewsEventsEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
    setCurrentPage(1); // Reset to page 1 when search changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to filter and paginate items for a specific category
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

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const newsData = getFilteredAndPaginatedItems("News");
  const eventsData = getFilteredAndPaginatedItems("Events");

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

        <div className="max-w-7xl mx-auto pb-12 px-4 lg:px-0">
          <div className="flex gap-4">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <Tabs
                    defaultActiveKey="News"
                    tabs={[
                      {
                        key: "News",
                        label: "News",
                        content: (
                          <div className="w-full">
                            <div className="w-full max-w-7xl">
                              {newsData.paginatedItems.length === 0 ? (
                                <div className="text-center py-12">
                                  <p className="text-gray-500">
                                    No news found
                                    {searchQuery &&
                                      ` matching "${searchQuery}"`}
                                    .
                                  </p>
                                </div>
                              ) : (
                                newsData.paginatedItems.map((item) => (
                                  <NewsEventCard
                                    key={item.sys.id}
                                    item={item}
                                    layout="list"
                                  />
                                ))
                              )}
                            </div>

                            {/* Pagination for News */}
                            {newsData.totalPages > 1 && (
                              <div className="flex items-center justify-center space-x-2 mt-8">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handlePageChange(currentPage - 1)
                                  }
                                  disabled={currentPage === 1}
                                >
                                  <ChevronLeft className="h-4 w-4 mr-1" />
                                  Previous
                                </Button>

                                {Array.from(
                                  { length: newsData.totalPages },
                                  (_, i) => i + 1
                                ).map((page) => (
                                  <Button
                                    key={page}
                                    variant={
                                      currentPage === page
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                    className={
                                      currentPage === page
                                        ? "bg-orange-500 hover:bg-orange-600"
                                        : ""
                                    }
                                  >
                                    {page}
                                  </Button>
                                ))}

                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handlePageChange(currentPage + 1)
                                  }
                                  disabled={currentPage === newsData.totalPages}
                                >
                                  Next
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </div>
                            )}
                          </div>
                        ),
                      },
                      {
                        key: "Events",
                        label: "Events",
                        content: (
                          <div className="w-full">
                            <div className="w-full">
                              {eventsData.paginatedItems.length === 0 ? (
                                <div className="text-center py-12">
                                  <p className="text-gray-500">
                                    No events found
                                    {searchQuery &&
                                      ` matching "${searchQuery}"`}
                                    .
                                  </p>
                                </div>
                              ) : (
                                eventsData.paginatedItems.map((item) => (
                                  <NewsEventCard
                                    key={item.sys.id}
                                    item={item}
                                    layout="list"
                                  />
                                ))
                              )}
                            </div>

                            <Pagination
                              currentPage={currentPage}
                              totalPages={newsData.totalPages}
                              onPageChange={handlePageChange}
                              variant="ghost"
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>

                <div className="lg:ml-8  ">
                  <div className="relative bg-[--surface-card]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search news"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 w-full lg:w-80 bg-[--surface-card]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
