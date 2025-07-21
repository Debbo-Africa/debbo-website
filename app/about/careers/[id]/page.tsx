"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import client from "@/lib/contentful";
import type { JobEntry, JobSkeleton } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { LetsWorkTogetherSection } from "@/components/lets-work-together";

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <strong className="font-semibold">{text}</strong>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-semibold text-general-black mb-4 mt-8">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-body-text-gray leading-relaxed mb-4">{children}</p>
    ),
  },
};

const extractApplyUrl = (urlDocument: any): string | null => {
  if (!urlDocument || !urlDocument.content) {
    return null;
  }

  for (const block of urlDocument.content) {
    if (block.nodeType === "paragraph" && block.content) {
      for (const inlineNode of block.content) {
        if (
          inlineNode.nodeType === "hyperlink" &&
          inlineNode.data &&
          inlineNode.data.uri
        ) {
          return inlineNode.data.uri;
        }
      }
    }
  }

  return null;
};

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<JobEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const entry = await client.getEntry<JobSkeleton>(params.id as string);
        setJob(entry as JobEntry);
        console.log("Fetched job entry:", entry);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Career", href: "/about/careers" },
    { label: job?.fields.role || "Loading..." },
  ];

  const renderSkeleton = () => (
    <div className="max-w-6xl mx-auto px-4 lg:px-8">
      <div className="mb-8 text-center animate-pulse">
        <div className="p-8 space-y-4">
          <div className="h-4 bg-[--surface-card] rounded w-1/3 mx-auto"></div>
          <div className="h-8 bg-[--surface-card] rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-[--surface-card] rounded w-1/4 mx-auto"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-4 bg-[--surface-card] rounded w-20"></div>
            <div className="h-4 bg-[--surface-card] rounded w-20"></div>
            <div className="h-4 bg-[--surface-card] rounded w-20"></div>
          </div>
        </div>
      </div>
      <div className="mb-8 animate-pulse">
        <div className="p-8 space-y-3">
          <div className="h-4 bg-[--surface-card] rounded"></div>
          <div className="h-4 bg-[--surface-card] rounded"></div>
          <div className="h-4 bg-[--surface-card] rounded"></div>
          <div className="h-4 bg-[--surface-card] rounded w-5/6"></div>
          <div className="h-10 bg-[--surface-card] rounded w-40 mx-auto mt-8"></div>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="mt-16 md:mt-20">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex items-center justify-center text-red-500 h-96">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job && !loading) {
    return (
      <div className="min-h-screen">
        <div className="mt-16 md:mt-20">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex items-center justify-center text-gray-600 h-96">
            <p>Job not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    role,
    specialization,
    employmentType,
    workMode,
    location,
    department,
    description,
    url,
  } = job?.fields || {};

  const applyUrl = extractApplyUrl(url);

  return (
    <div className="min-h-screen">
      <div className="mt-16 md:mt-20">
        <Breadcrumb items={breadcrumbItems} />

        {loading ? (
          renderSkeleton()
        ) : (
          <div className="max-w-6xl mx-auto px-0 lg:px-8 ">
            <div className="mb-8 text-center">
              <div className="">
                <div className="space-y-6">
                  <p className="bg-[--surface-card] px-3 py-1 rounded-full w-fit  mx-auto ">
                    {department}
                  </p>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-general-black mb-2">
                      {role}
                    </h1>
                    {specialization && (
                      <p className="text-xl text-body-text-gray">
                        {specialization}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2  text-body-text-gray justify-center">
                    <Clock className="w-5 h-5" />
                    <div className="flex gap-2">
                      <p className="font-medium">{workMode}</p>
                      <p className="font-medium">{employmentType}</p>
                    </div>
                    <div className="flex items-center gap-2  text-body-text-gray">
                      <MapPin className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="p-8">
                <div className="prose prose-gray max-w-none">
                  {documentToReactComponents(
                    description as any,
                    richTextOptions
                  )}
                </div>
                {applyUrl ? (
                  <div className="mt-8">
                    <Link
                      href={applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="px-8 py-3 rounded-full bg-black text-white font-medium">
                        Apply Now →
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <p className="mt-4  text-body-text-gray">
                    No application link available for this job.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <LetsWorkTogetherSection
        buttonLink=""
        description=""
        title="We welcome and encourage applicants from all backgrounds."
      />
    </div>
  );
}
