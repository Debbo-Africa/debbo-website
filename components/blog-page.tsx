"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import client from "@/lib/contentful";
import type { BlogEntry, BlogSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { BlogCard } from "./blog-card";
import { Pagination } from "./pagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 20;

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const entries: EntryCollection<BlogSkeleton> =
          await client.getEntries<BlogSkeleton>({
            content_type: "blog",
            order: "-sys.createdAt" as any,
          });

        const allBlogs = entries.items as BlogEntry[];
        setBlogs(allBlogs);

        const featured = allBlogs
          .filter((blog) => blog.fields.featured)
          .sort(
            (a, b) =>
              new Date(b.sys.createdAt).getTime() -
              new Date(a.sys.createdAt).getTime()
          )
          .slice(0, 3);

        setFeaturedBlogs(featured);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = [
    "Categories",
    ...Array.from(new Set(blogs.map((blog) => blog.fields.category))),
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      searchQuery === "" ||
      blog.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.fields.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.fields.writer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Categories" ||
      blog.fields.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <div className="mt-20">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "DébboAfrica Blog" }]}
        />

        <PageHero
          title="DébboAfrica Blog"
          description="Welcome to the DébboAfrica Blog, your source for empowering women's health and wellness. From nutrition and fitness to mental health and disease prevention, we're sharing valuable insights and support for your journey towards a healthier and happier life."
          imageSrc="/images/faq.png"
          imageAlt="Blog illustration"
        />

        <div className="max-w-7xl mx-auto pb-12 px-4 lg:px-0">
          {loading ? (
            <BlogPageSkeleton />
          ) : (
            <>
              {featuredBlogs.length > 0 && (
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <div className="md:col-span-3 lg:col-span-2">
                      <BlogCard blog={featuredBlogs[0]} featured={true} />
                    </div>

                    <div className="md:col-span-3 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                      {featuredBlogs.slice(1).map((blog) => (
                        <div key={blog.sys.id}>
                          <BlogCard
                            blog={blog}
                            featured={false}
                            compact={true}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Filter and Search Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-48 bg-[--surface-card] rounded-lg border-none">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[--surface-card] rounded-lg border-none">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-text h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search blogs..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 bg-[--surface-card] rounded-lg border-none"
                    />
                  </div>
                </div>
              </div>

              {paginatedBlogs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No blogs found
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedCategory !== "Categories" &&
                      ` in category "${selectedCategory}"`}
                    .
                  </p>
                </div>
              ) : (
                <div className="space-y-6 mb-8">
                  {paginatedBlogs.map((blog) => (
                    <BlogCard key={blog.sys.id} blog={blog} horizontal={true} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogPageSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-3 lg:col-span-2 h-64 bg-[--surface-card] rounded animate-pulse"></div>
        <div className="md:col-span-3 lg:col-span-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-32 bg-[--surface-card] rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="w-48 h-10 bg-[--surface-card] rounded animate-pulse"></div>
        <div className="w-full md:w-64 h-10 bg-[--surface-card] rounded animate-pulse"></div>
      </div>

      {[1, 2].map((i) => (
        <div
          key={i}
          className="h-32 bg-[--surface-card] rounded mb-6 animate-pulse"
        ></div>
      ))}
    </div>
  );
}
