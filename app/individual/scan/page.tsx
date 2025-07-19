"use client";

import { useEffect, useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { PageHero } from "@/components/page-hero";
import { TestHeader } from "@/components/test-header";
import { TestCard } from "@/components/test-card";
import client from "@/lib/contentful";
import type { MedicalTestEntry, MedicalTestSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";

export default function BookScanPage() {
  const [scans, setScans] = useState<MedicalTestEntry[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scans.map((scan) => (
            <TestCard key={scan.sys.id} test={scan} />
          ))}
        </div>
      </div>
    </div>
  );
}
