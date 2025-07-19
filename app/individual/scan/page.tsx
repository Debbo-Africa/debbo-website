"use client";

import { useEffect, useState, useMemo } from "react";
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

const ITEMS_PER_PAGE = 6;

export default function BookScanPage() {
  const [scans, setScans] = useState<MedicalTestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const entries: EntryCollection<MedicalTestSkeleton> =
          await client.getEntries<MedicalTestSkeleton>({
            content_type: "medicalTest",
            "fields.scan": true,
          });

        setScans(entries.items as MedicalTestEntry[]);
      } catch (error) {
        console.error("Error fetching scans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    scans.forEach((scan) => {
      if (scan.fields.category) {
        uniqueCategories.add(scan.fields.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [scans]);

  const filteredScans = useMemo(() => {
    return scans.filter((scan) => {
      const matchesSearch = scan.fields.testName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all"
          ? true
          : scan.fields.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [scans, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredScans.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedScans = filteredScans.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <TestHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <TestHeader />

      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Book a Scan" }]}
      />

      <PageHero
        title="Book a Scan"
        description="Sometimes, what's happening inside doesn't show on the outside, scans help fill in the gaps. From breast to abdominal and pelvic scans, our options offer powerful insights to detect issues early and keep you reassured."
        imageSrc="/images/faq.png"
        imageAlt="Book a Scan"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-body-text-gray w-4 h-4" />
              <Input
                placeholder="Search scans..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 w-full md:max-w-xs bg-[--surface-card] border-none focus:outline-none focus:border-none"
              />
            </div>

            {categories.length > 0 && (
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full md:w-48 bg-[--surface-card]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-[--surface-card]">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
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

         
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedScans.map((scan) => (
            <TestCard key={scan.sys.id} test={scan} />
          ))}
        </div>

        {filteredScans.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No scans found.</p>
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
    </div>
  );
}
