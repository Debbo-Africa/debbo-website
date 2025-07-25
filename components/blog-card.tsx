"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogEntry } from "@/types/contentful";

interface BlogCardProps {
  blog: BlogEntry;
  featured?: boolean;
  horizontal?: boolean;
  compact?: boolean;
}

export function BlogCard({
  blog,
  featured = false,
  horizontal = false,
  compact = false,
}: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const imageUrl = (blog as any).fields.image?.fields?.file?.url;

  if (featured) {
    return (
      <div className="relative group cursor-pointer">
        <Link href={`/resourses/blog/${createSlug(blog.fields.title)}`}>
          <div className="aspect-[4/3] lg:aspect-[16/12] relative rounded-2xl overflow-hidden">
            {imageUrl && (
              <Image
                src={`https:${imageUrl}`}
                alt={blog.fields.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-6 right-6 text-white">
              <div className="flex gap-2 mb-6 flex-wrap">
                <p className="bg-[#FFF5E94D] px-3 py-1 rounded-full">
                  featured
                </p>
                <p className="bg-[#FFF5E94D] px-3 py-1 rounded-full">
                  {blog.fields.category}
                </p>
              </div>
              <div className="flex items-center gap-4 mb-3 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.fields.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{blog.fields.writer}</span>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold leading-tight max-w-xs">
                {blog.fields.title}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="group">
        <Link href={`/resources/blog/${createSlug(blog.fields.title)}`}>
          <div className="aspect-[4/3] lg:aspect-[4/2] relative rounded-2xl overflow-hidden mb-3">
            {imageUrl && (
              <Image
                src={`https:${imageUrl}`}
                alt={blog.fields.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </Link>

        <div className="space-y-2">
          <div className="text-xs bg-[--surface-card] w-fit mb-2 px-3 py-1 rounded-full">
            {blog.fields.category}
          </div>
          <Link href={`/blog/${createSlug(blog.fields.title)}`}>
            <h3 className="text-md font-bold text-general-black  transition-colors leading-tight line-clamp-2">
              {blog.fields.title}
            </h3>
          </Link>
          <div className="text-xs text-body-text-gray">
            {formatDate(blog.fields.date)}
          </div>
        </div>
      </div>
    );
  }

  if (horizontal) {
    return (
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 group">
        <Link
          href={`/resources/blog/${createSlug(blog.fields.title)}`}
          className="flex-shrink-0"
        >
          <div className="w-full md:w-52 h-48 md:h-36 relative rounded-xl overflow-hidden">
            {imageUrl && (
              <Image
                src={`https:${imageUrl}`}
                alt={blog.fields.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="text-xs mb-2 bg-[--surface-card] w-fit px-3 py-1 rounded-full">
            {blog.fields.category}
          </div>
          <Link href={`/resources/blog/${createSlug(blog.fields.title)}`}>
            <h3 className="text-lg font-semibold text-general-black transition-colors leading-tight mb-2 max-w-sm">
              {blog.fields.title}
            </h3>
          </Link>
          <div className="flex items-center gap-4 text-sm mb-3">
            <span>{formatDate(blog.fields.date)}</span>
            <span>{blog.fields.writer}</span>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <Link href={`/resources/blog/${createSlug(blog.fields.title)}`}>
            <Button
              variant="link"
              className="text-body-text-gray hover:text-general-black p-0 h-auto underline whitespace-nowrap"
            >
              Read more
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group ">
      <Link href={`/resources/blog/${createSlug(blog.fields.title)}`}>
        <div className="aspect-[4/2] relative rounded-2xl overflow-hidden mb-4">
          {imageUrl && (
            <Image
              src={`https:${imageUrl}`}
              alt={blog.fields.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
      </Link>

      <div className="space-y-3">
        <div className="inline-block bg-[--surface-card] text-general-black px-3 py-1 rounded-full text-sm font-medium mb-4">
          {blog.fields.category}
        </div>

        <Link href={`/resources/blog/${createSlug(blog.fields.title)}`}>
          <h3 className="text-lg font-semibold text-general-black  transition-colors leading-tight">
            {blog.fields.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-sm ">
          <span>{formatDate(blog.fields.date)}</span>{" "}
          <span className="text-body-text-gray font-bold mb-1">.</span>
          <span>{blog.fields.writer}</span>
        </div>

        <Link href={`/resources/blog/${createSlug(blog.fields.title)}`}>
          <Button
            variant="link"
            className="text-body-text-gray hover:text-general-black p-0 h-auto underline mt-4"
          >
            Read more
          </Button>
        </Link>
      </div>
    </div>
  );
}
