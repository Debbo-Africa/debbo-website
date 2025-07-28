"use client";

import { useEffect, useState } from "react";
import client from "@/lib/contentful";
import type {
  PrivacyPolicyEntry,
  PrivacyPolicySkeleton,
} from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

import { Breadcrumb } from "@/components/breadcrumb";
import { PageHero } from "@/components/page-hero";
import { Tabs } from "@/components/tabs";


const richTextOptions = {
  renderNode: {
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-xl font-bold text-general-black mb-4 mt-8">
        {children}
      </h3>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-body-text-gray leading-relaxed mb-4">{children}</p>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside text-body-text-gray mb-4 space-y-2">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside text-body-text-gray mb-4 space-y-2">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
      const content = children.map((child: any, index: number) => {
        if (typeof child === "object" && child?.type === "p") {
          return <span key={index}>{child.props.children}</span>;
        }
        return child;
      });

      return <li className="mb-1">{content}</li>;
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      let href = node.data.uri;
      if (!href.startsWith("http://") && !href.startsWith("https://")) {
        href = `https://${href}`;
      }

      return (
        <a
          href={href}
          className="text-yellow hover:underline break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  renderMark: {
    [MARKS.BOLD]: (text: any) => (
      <strong className="font-semibold">{text}</strong>
    ),
  },
};



export default function PrivacyPolicyPage() {
  const [policyData, setPolicyData] = useState<PrivacyPolicyEntry | null>(null);
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const entries: EntryCollection<PrivacyPolicySkeleton> =
          await client.getEntries<PrivacyPolicySkeleton>({
            content_type: "privacyPolicyTermsOfUse",
          });

        if (entries.items.length > 0) {
          setPolicyData(entries.items[0] as PrivacyPolicyEntry);
        }
      } catch (error) {
        console.error("Error fetching policy data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, []);

  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy & Terms" },
        ]}
      />

      <PageHero
        title="Privacy Policy & Terms of Use"
        description="Access all our Privacy Policy and Terms of Use information here. Feel free to read through"
        imageSrc="/images/faq.png"
        imageAlt="Privacy Policy illustration"
      />

      <div className="max-w-6xl mx-auto pb-12 px-4 lg:px-0">
        <div className="rounded-lg shadow-sm">
          {loading ? (
            <div className="animate-pulse p-8 space-y-4">
              <div className="h-6 bg-[--surface-card] rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-[--surface-card] rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-[--surface-card] rounded w-2/3 mx-auto"></div>
              <div className="h-4 bg-[--surface-card] rounded w-1/4 mx-auto"></div>
              <div className="h-4 bg-[--surface-card] rounded w-3/4 mx-auto"></div>
            </div>
          ) : policyData ? (
            <Tabs
              tabs={[
                {
                  key: "privacy",
                  label: "Privacy Policy",
                  content: (
                    <div className="prose prose-lg max-w-none">
                      {documentToReactComponents(
                        policyData.fields.privacyPolicy,
                        richTextOptions
                      )}
                    </div>
                  ),
                },
                {
                  key: "terms",
                  label: "Terms of use",
                  content: (
                    <div className="prose prose-lg max-w-none">
                      {documentToReactComponents(
                        policyData.fields.termsOfUse,
                        richTextOptions
                      )}
                    </div>
                  ),
                },
              ]}
              activeTab={activeTab as any}
              setActiveTab={setActiveTab}
              className="justify-center " 
            />
          ) : (
            <div className="p-8 text-center text-red-600">
              Failed to load policy data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
