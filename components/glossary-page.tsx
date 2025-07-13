"use client";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import client from "@/lib/contentful";
import type { GlossaryEntry, GlossarySkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { GlossaryTermItem } from "./glossary-term-item";
import { Pagination } from "./pagination";

const ITEMS_PER_PAGE = 3;

export default function GlossaryPage() {
  const [glossaryTerms, setGlossaryTerms] = useState<GlossaryEntry[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<GlossaryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlossaryTerms = async () => {
      try {
        const entries: EntryCollection<GlossarySkeleton> =
          await client.getEntries<GlossarySkeleton>({
            content_type: "dbboAfricaGlossary",
            order: "fields.title" as any,
          });

        setGlossaryTerms(entries.items as GlossaryEntry[]);
        setFilteredTerms(entries.items as GlossaryEntry[]);
      } catch (error) {
        console.error("Error fetching glossary terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlossaryTerms();
  }, []);

  useEffect(() => {
    const filtered = glossaryTerms.filter(
      (term) =>
        term.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.fields.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredTerms(filtered);
    setCurrentPage(1);
  }, [searchQuery, glossaryTerms]);

  const totalPages = Math.ceil(filteredTerms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTerms = filteredTerms.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "DébboAfrica Glossary" },
        ]}
      />

      {/* Hero Section */}
      <div className="mb-12 mx-auto relative px-4 lg:px-0">
        <PageHero
          title="DébboAfrica Glossary"
          description=" Welcome to the DébboAfrica Glossary Blog, your go-to resource for
              understanding women's health, the various conditions affecting the
              female body, and the treatments available for these conditions."
          imageSrc="/images/faq.png"
          imageAlt="DébboAfrica Glossary"
        />
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-text w-4 h-4" />
            <Input
              type="text"
              placeholder="Search news"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[--surface-card] rounded-lg focus:ring-2 focus:ring-yellow focus:border-transparent max-w-xs"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-12">
        <div className="">
          {currentTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-text text-lg">
                No glossary terms found matching your search.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {currentTerms.map((term) => (
                <GlossaryTermItem key={term.sys.id} term={term} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
