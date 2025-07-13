"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import client from "@/lib/contentful";
import type { BlogEntry, BlogSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Breadcrumb } from "./breadcrumb";
import { BlogCard } from "./blog-card";
import { DismissibleBanner } from "./dismissable-banner";

interface BlogDetailPageProps {
  slug: string;
}

export default function BlogDetailPage({ slug }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<BlogEntry | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Custom rich text renderer with responsive image handling
  const richTextOptions = {
    renderNode: {
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="text-2xl font-bold text-general-black mb-6 mt-10">
          {children}
        </h3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="text-gray-text leading-relaxed mb-6 text-lg">
          {children}
        </p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = node.data.target;
        if (!asset?.fields?.file?.url) return null;

        return (
          <div className="my-8">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <Image
                src={`https:${asset.fields.file.url}`}
                alt={asset.fields.title || "Blog image"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        );
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <strong className="font-semibold text-general-black">{text}</strong>
      ),
    },
  };

  // Custom function to handle multiple consecutive images
  const renderContentWithImageGroups = (content: any) => {
    if (!content?.content)
      return documentToReactComponents(content, richTextOptions);

    const elements: React.ReactNode[] = [];
    let imageGroup: any[] = [];
    let elementIndex = 0;

    const flushImageGroup = () => {
      if (imageGroup.length > 0) {
        const imageCount = imageGroup.length;
        let gridClass = "";

        if (imageCount === 1) {
          gridClass = "grid-cols-1";
        } else if (imageCount === 2) {
          gridClass = "grid-cols-1 md:grid-cols-2";
        } else {
          gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        }

        elements.push(
          <div
            key={`image-group-${elementIndex}`}
            className={`grid ${gridClass} gap-6 my-8`}
          >
            {imageGroup.map((asset, index) => (
              <div
                key={`image-${elementIndex}-${index}`}
                className="relative aspect-video rounded-2xl overflow-hidden"
              >
                <Image
                  src={`https:${asset.fields.file.url}`}
                  alt={asset.fields.title || `Blog image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        );
        imageGroup = [];
        elementIndex++;
      }
    };

    content.content.forEach((node: any, index: number) => {
      if (
        node.nodeType === "embedded-asset-block" &&
        node.data?.target?.fields?.file?.url
      ) {
        imageGroup.push(node.data.target);
      } else {
        flushImageGroup();
        elements.push(
          <div key={`content-${index}`}>
            {documentToReactComponents(
              { ...content, content: [node] },
              richTextOptions
            )}
          </div>
        );
      }
    });

    flushImageGroup();
    return elements;
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const entries: EntryCollection<BlogSkeleton> =
          await client.getEntries<BlogSkeleton>({
            content_type: "blog",
          });

        const allBlogs = entries.items as BlogEntry[];
        const currentBlog = allBlogs.find(
          (blog) => createSlug(blog.fields.title) === slug
        );

        if (currentBlog) {
          setBlog(currentBlog);

          // Get related blogs from the same category (top 3 most recent)
          const related = allBlogs
            .filter(
              (blog) =>
                blog.fields.category === currentBlog.fields.category &&
                blog.sys.id !== currentBlog.sys.id
            )
            .sort(
              (a, b) =>
                new Date(b.sys.createdAt).getTime() -
                new Date(a.sys.createdAt).getTime()
            )
            .slice(0, 3);

          setRelatedBlogs(related);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-general-black mb-4">
            Blog Not Found
          </h1>
          <p className="text-gray-text mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <button className="bg-general-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = (blog as any).fields.image?.fields?.file?.url;

  return (
    <div className="min-h-screen">
      <DismissibleBanner />

      <div className="mt-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "DébboAfrica Blog", href: "/resources/blog" },
            { label: blog.fields.title },
          ]}
        />

        {/* Blog Header */}
        <div className=" px-4 lg:px-0 mb-12">
          <div className=" mb-8 max-w-4xl mx-auto">
            <div className="inline-block bg-[--surface-card] text-general-black px-3 py-1 rounded-full text-sm font-medium mb-4">
              {blog.fields.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-general-black mb-6 leading-tight">
              {blog.fields.title}
            </h1>
            <div className="flex items-center  gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{blog.fields.writer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(blog.fields.date)}</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          {imageUrl && (
            <div className="aspect-video relative rounded-2xl overflow-hidden mb-12 max-w-7xl mx-auto">
              <Image
                src={`https:${imageUrl}`}
                alt={blog.fields.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto px-4 lg:px-0 mb-16">
          <div className="prose prose-lg max-w-none">
            {renderContentWithImageGroups(blog.fields.about)}
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-12">
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-general-black mb-8">
                Post you might also like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog.sys.id} blog={relatedBlog} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
