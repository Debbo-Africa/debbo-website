"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const marginTopClass =
    pathname.includes("individual") || pathname.includes("cart")
      ? "mt-10"
      : "mt-0";

  return (
    <div className={`max-w-7xl mx-auto px-4 pt-4 ${marginTopClass}`}>
      <nav
        className="
          text-sm mb-4
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
                className="hover:underline truncate max-w-[15rem] text-body-gray-text"
              >
                {item.label}
              </Link>
            ) : (
              <span className="truncate max-w-[10rem] text-general-black font-semibold">
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
