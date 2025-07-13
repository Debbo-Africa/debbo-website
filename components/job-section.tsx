"use client";

import { useEffect, useState } from "react";
import client from "@/lib/contentful";
import type { JobEntry, JobSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { JobCard } from "./job-card";
import { Loader2 } from "lucide-react";
import { Building } from "lucide-react"; // Import Building component
import { DepartmentFilter } from "./ui/department-filter";

export function JobsSection() {
  const [jobs, setJobs] = useState<JobEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const entries: EntryCollection<JobSkeleton> =
          await client.getEntries<JobSkeleton>({
            content_type: "job",
            order: "-sys.createdAt" as any,
          });
        setJobs(entries.items as JobEntry[]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Get unique departments and job counts
  const departments = Array.from(
    new Set(jobs.map((job) => job.fields.department))
  );
  const jobCounts = departments.reduce((acc, dept) => {
    acc[dept] = jobs.filter((job) => job.fields.department === dept).length;
    return acc;
  }, {} as Record<string, number>);

  const filteredJobs = selectedDepartment
    ? jobs.filter((job) => job.fields.department === selectedDepartment)
    : jobs;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <span className="ml-2 text-gray-600">Loading opportunities...</span>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Current Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our mission to transform healthcare for women across Africa.
            Explore our current openings and find your perfect role.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-8">
          <DepartmentFilter
            departments={departments}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            jobCounts={jobCounts}
          />
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-4  rounded-full flex items-center justify-center">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No positions available
              </h3>
              <p className="text-gray-600">
                {selectedDepartment
                  ? `No current openings in ${selectedDepartment}. Check back soon!`
                  : "We don't have any open positions right now, but we're always growing!"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.sys.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
