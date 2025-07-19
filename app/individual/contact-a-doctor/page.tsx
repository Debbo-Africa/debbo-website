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
import { InsuranceSection } from "@/components/insurance-section";
import CareCategoriesSection from "@/components/careCategory";

const ITEMS_PER_PAGE = 6;

export default function SpeakToDoctor() {
  const [medicalTest, setMedicalTest] = useState<MedicalTestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchMedicalTest = async () => {
      try {
        const entries: EntryCollection<MedicalTestSkeleton> =
          await client.getEntries<MedicalTestSkeleton>({
            content_type: "medicalTest",
          });

        setMedicalTest(entries.items as MedicalTestEntry[]);
      } catch (error) {
        console.error("Error fetching medicalTest:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalTest();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    medicalTest.forEach((test) => {
      if (test.fields.category) {
        uniqueCategories.add(test.fields.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [medicalTest]);

  const filteredTests = useMemo(() => {
    return medicalTest.filter((test) => {
      const matchesSearch = test.fields.testName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all"
          ? true
          : test.fields.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [medicalTest, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTests = filteredTests.slice(
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
        items={[{ label: "Home", href: "/" }, { label: "Speak to a Doctor" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CareCategoriesSection/>
        <InsuranceSection />
        {medicalTest.length > 0 && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 mt-12">
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-body-text-gray w-4 h-4" />
                <Input
                  placeholder="Search tests..."
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
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedTests.map((test) => (
            <TestCard key={test.sys.id} test={test} hideCart={true} />
          ))}
        </div>

        {filteredTests.length === 0 && medicalTest.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No tests found matching your criteria.
            </p>
          </div>
        )}

        {medicalTest.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No medical tests available.</p>
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
