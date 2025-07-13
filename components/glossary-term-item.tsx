"use client";

import Link from "next/link";
import type { GlossaryEntry } from "@/types/contentful";

interface GlossaryTermItemProps {
  term: GlossaryEntry;
}

export function GlossaryTermItem({ term }: GlossaryTermItemProps) {
  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div
      key={term.sys.id}
      className="border-b border-gray-100 pb-4 flex justify-between flex-row items-center gap-10"
    >
      <div className="">
        <h3 className="text-lg font-semibold text-general-black mb-2">
          {term.fields.title}
        </h3>
        <p className="text-gray-text mb-2 max-w-xl">
          {term.fields.description}
        </p>
      </div>
      <Link
        href={`/resources/glossary/${createSlug(term.fields.title)}`}
        className="text-gray-text border-b border-text-gray font-medium text-sm"
      >
        Read more
      </Link>
    </div>
  );
}
