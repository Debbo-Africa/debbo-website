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
import { SkeletonTestCard } from "@/components/skeleton-test-card";
import HorizontalProcessSection from "@/components/How-it-works";
import BookAppointment from "@/components/book-appointment";
import ContraceptionTable from "@/components/contreption-table";
import LetsWorkTogetherSection from "@/components/lets-work-together";

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

  return (
    <div className="min-h-screen pt-20">
      <TestHeader />

      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Speak to a Doctor" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CareCategoriesSection />
        <BookAppointment />
        <ContraceptionTable />
        <LetsWorkTogetherSection
          title="Need a vaccine?"
          description="Protect your health with our recommended vaccines for long-term disease prevention. We offer safe, medically approved options for adults and eligible adolescents. Contact us to learn more or book an appointment."
          imageSrc="/images/speak-to-a-doctor.png"
        />
        <InsuranceSection />
      </div>
    </div>
  );
}
