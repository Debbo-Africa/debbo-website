"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import client from "@/lib/contentful";
import type { GlossaryEntry, GlossarySkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { GlossaryTermItem } from "./glossary-term-item";
import { Pagination } from "./pagination";

const ITEMS_PER_PAGE = 10;

const LoadingGlossaryPlaceholder = () => (
  <div className="animate-pulse border-b border-gray-100 pb-4 flex justify-between flex-row items-center gap-10">
    <div className="flex-1 space-y-4">
      <div className="h-4 bg-[--surface-card] rounded w-1/4"></div>
      <div className="h-6 bg-[--surface-card] rounded w-3/4"></div>
      <div className="h-4 bg-[--surface-card] rounded w-1/2"></div>
    </div>
    <div className="h-6 w-24 bg-[--surface-card] rounded"></div>
  </div>
);

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

  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "DébboAfrica Glossary" },
        ]}
      />

      <div className="mb-12 mx-auto relative px-4 lg:px-0">
        <PageHero
          title="DébboAfrica Glossary"
          description="Welcome to the Débbo Africa Glossary, your go-to resource for understanding women’s health, the various conditions affecting the female body, and the treatments available for these conditions."
          imageSrc="/images/faq.png"
          imageAlt="DébboAfrica Glossary"
        />
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-text w-4 h-4 outline-none " />
            <Input
              type="text"
              placeholder="Search glossary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[--surface-card] rounded-lg focus:ring-2 focus:ring-yellow focus:border-transparent max-w-xs outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-12">
        <div className="">
          {loading ? (
            <div className="space-y-8">
              {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                <LoadingGlossaryPlaceholder key={index} />
              ))}
            </div>
          ) : currentTerms.length === 0 ? (
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

          {!loading && totalPages > 1 && (
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
