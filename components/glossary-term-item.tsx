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
    <Link
      href={`/resources/glossary/${createSlug(term.fields.title)}`}
      className="block border-b border-gray-100 pb-4 transition-transform transform hover:scale-[1.02]  rounded-md duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-10 p-2">
        <div>
          <h3 className="text-lg font-extrabold text-general-black mb-2">
            {term.fields.title}
          </h3>
          <p className="text-body-text-gray mb-2 max-w-xl font-light">
            {term.fields.description}
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="text-body-gray-text border-b border-body-text-gray text-sm font-light">
            Read more
          </span>
        </div>
      </div>
    </Link>
  );
}
