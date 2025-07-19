"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-4">
      <nav
        className="
          text-sm  mb-4
          flex flex-wrap
          lg:justify-start justify-center 
          truncate
        "
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline truncate max-w-[15rem] text-gray-text"
              >
                {item.label}
              </Link>
            ) : (
              <span className="truncate  max-w-[10rem] text-general-black">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-text">/</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}
