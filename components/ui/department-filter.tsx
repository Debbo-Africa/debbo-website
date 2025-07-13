"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DepartmentFilterProps {
  departments: string[];
  selectedDepartment: string | null;
  onDepartmentChange: (department: string | null) => void;
  jobCounts: Record<string, number>;
}

export function DepartmentFilter({
  departments,
  selectedDepartment,
  onDepartmentChange,
  jobCounts,
}: DepartmentFilterProps) {
  const totalJobs = Object.values(jobCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="w-full max-w-sm flex gap-2 items-center">
      <p className="block text-sm">Filter by department</p>
      <Select
        value={selectedDepartment || "all"}
        onValueChange={(value) =>
          onDepartmentChange(value === "all" ? null : value)
        }
      >
        <SelectTrigger className="w-full bg-[--surface-card]">
          <SelectValue placeholder="Filter by Department" />
        </SelectTrigger>
        <SelectContent className="bg-[--surface-card]">
          <SelectItem value="all">All ({totalJobs})</SelectItem>
          {departments.map((department) => (
            <SelectItem key={department} value={department}>
              {department} ({jobCounts[department] || 0})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
