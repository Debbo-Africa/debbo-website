"use client";

import type { JobEntry } from "@/types/contentful";
import Link from "next/link";

interface JobCardProps {
  job: JobEntry;
}

export function JobCard({ job }: JobCardProps) {
  const {
    role,
    specialization,
    employmentType,
    workMode,
    location,
    department,
    description,
  } = job.fields;

  return (
    <div className="h-full hover:shadow-lg transition-all duration-300 bg-[--surface-card] rounded-2xl ">
      <div className="p-6 flex flex-col h-full">
        <p className="font-medium text-gray-900 px-2 rounded-full text-xs bg-[#FFF5EB] text-yellow w-fit mb-2">
          {department}
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-general-black mb-1">{role}</h3>
          {specialization && (
            <p className="text-gray-600 text-sm">{specialization}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-2 text-[#333537] text-md font-light">
          <div className="px-2 py-1">
            <span>{employmentType}</span>
          </div>
          <div className="px-2 py-1">
            <span>{workMode}</span>
          </div>
          <div className="px-2 py-1 w-full">
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-auto px-2 text-general-black">
          <Link href={`/about/careers/${job.sys.id}`} className="block">
            Learn more →
          </Link>
        </div>
      </div>
    </div>
  );
}
