"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import client from "@/lib/contentful";
import type { JobEntry, JobSkeleton } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Building, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <strong className="font-semibold">{text}</strong>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    [BLOCKS.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        className="text-blue-600 hover:text-blue-800 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function JobDetailPage() {
  const params = useParams();
  const [job, setJob] = useState<JobEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const entry = await client.getEntry<JobSkeleton>(params.id as string);
        setJob(entry as JobEntry);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError("Job not found");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchJob();
    }
  }, [params.id]);

  if (error || !job) {
    return null;
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
  } = job.fields;
  console.log(url);
  return (
    <div className="min-h-screen">
      <div className="mt-16 md:mt-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Career", href: "/career" },
            { label: role },
          ]}
        />
        <div className="max-w-6xl mx-auto px-4 lg:px-8 ">
          {/* Job Header */}
          <div className="mb-8 text-center">
            <div className="p-8">
              <div className="space-y-6">
                <p>{department}</p>

                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {role}
                  </h1>
                  {specialization && (
                    <p className="text-xl text-gray-600">{specialization}</p>
                  )}
                </div>

                {/* Job Meta Info */}
                <div className="flex items-center gap-2 text-gray-600 justify-center">
                  <Clock className="w-5 h-5" />
                  <div className="flex gap-2">
                    <p className="font-medium">{workMode}</p>
                    <p className="font-medium">{employmentType}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="font-medium">{location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <div className="p-8">
              <div className="prose prose-gray max-w-none">
                {documentToReactComponents(description, richTextOptions)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
