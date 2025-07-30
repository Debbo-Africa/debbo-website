"use client";

import type { JobEntry } from "@/types/contentful";
import Link from "next/link";
import ButtonComponent from "./Button";
import { Briefcase, MapPin } from "lucide-react";

interface JobCardProps {
  job: JobEntry;
}

export function JobCard({ job }: JobCardProps) {
  const {
    role,
    specialization,
    workMode,
    employmentType,
    location,
    department,
    description,
  } = job.fields;

  return (
    <div className="h-full hover:shadow-lg transition-all duration-300 bg-[--surface-card] rounded-2xl md:rounded-3xl ">
      <div className="p-6 flex flex-col h-full">
        <p className="font-medium text-gray-900 px-3 py-1 rounded-full text-xs bg-[#FFF5EB] text-yellow w-fit mb-4">
          {department}
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-general-black mb-1">{role}</h3>
          {specialization && (
            <p className="text-gray-600 text-sm">{specialization}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2 text-[#333537] text-md font-light">
          <div className="flex">
            <div className="flex items-center gap-2 px-2 py-1">
              <Briefcase className="w-4 h-4 text-gray-600" />
              <span>{employmentType}</span>
            </div>
            <div className="px-2 py-1">
              <span>{workMode}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2 py-1">
            <MapPin className="w-4 h-4 text-gray-600" />
            <span>{location}</span>
          </div>
        </div>

        <div className="mt-auto px-2 text-general-black">
          <ButtonComponent
            text="Learn more"
            defaultColor="#f2e9dd"
            linkTo={`/about/careers/${job.sys.id}`}
            className="text-general-black hover:text-general-white px-0 hover:px-4 duration-150"
            hoverColor="#0d0d0d"
          />
        </div>
      </div>
    </div>
  );
}
