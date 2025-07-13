"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import client from "@/lib/contentful";
import type { GlossaryEntry, GlossarySkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "./breadcrumb";
import Link from "next/link";
import { PageHero } from "./page-hero";
import { GlossaryTermItem } from "./glossary-term-item";

const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold text-general-black mb-4 mt-8">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-gray-text leading-relaxed mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="text-gray-text leading-relaxed">{children}</li>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <strong className="font-semibold text-general-black">{text}</strong>
    ),
  },
};

interface GlossaryDetailPageProps {
  slug: string;
}

export default function GlossaryDetailPage({ slug }: GlossaryDetailPageProps) {
  const [glossaryTerm, setGlossaryTerm] = useState<GlossaryEntry | null>(null);
  const [relatedTerms, setRelatedTerms] = useState<GlossaryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const createSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    const fetchGlossaryTerm = async () => {
      try {
        const entries: EntryCollection<GlossarySkeleton> =
          await client.getEntries<GlossarySkeleton>({
            content_type: "dbboAfricaGlossary",
          });

        const allTerms = entries.items as GlossaryEntry[];
        const currentTerm = allTerms.find(
          (term) => createSlug(term.fields.title) === slug
        );

        if (currentTerm) {
          setGlossaryTerm(currentTerm);

          const related = allTerms
            .filter(
              (term) =>
                term.fields.category === currentTerm.fields.category &&
                term.sys.id !== currentTerm.sys.id
            )
            .slice(0, 3);

          setRelatedTerms(related);
        }
      } catch (error) {
        console.error("Error fetching glossary term:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlossaryTerm();
  }, [slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  if (!glossaryTerm) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-general-black mb-4">
            Term Not Found
          </h1>
          <p className="text-gray-text mb-6">
            The glossary term you're looking for doesn't exist.
          </p>
          <Link href="/glossary">
            <Button>Back to Glossary</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "DébboAfrica Glossary", href: "/resources/glossary" },
          { label: glossaryTerm.fields.title },
        ]}
      />
      <PageHero
        title={glossaryTerm.fields.title}
        description={glossaryTerm.fields.description}
        imageSrc="/images/faq.png"
        imageAlt={glossaryTerm.fields.title}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-0 pb-12">
        <div className="">
          <div className="mb-8">
            <p className="text-gray-text leading-relaxed">
              {glossaryTerm.fields.meaning}
            </p>
          </div>

          {/* Detailed Explanation */}
          <div className="prose prose-lg max-w-none mb-12">
            {documentToReactComponents(
              glossaryTerm.fields.explanation,
              richTextOptions
            )}
          </div>

          {relatedTerms.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-general-black mb-6">
                Related glossary for you
              </h2>
              <div className="space-y-4">
                {relatedTerms.map((term) => (
                  <GlossaryTermItem key={term.sys.id} term={term} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
        size="icon"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
}
