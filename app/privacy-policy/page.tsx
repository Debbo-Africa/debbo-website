"use client";

import { useEffect, useState } from "react";
import client from "@/lib/contentful";
import type {
  PrivacyPolicyEntry,
  PrivacyPolicySkeleton,
} from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";

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
      <p className="text-gray-text leading-relaxed mb-4">{children}</p>
    ),
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

  if (loading) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!policyData) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-lg text-red-600">Failed to load policy data</div>
      </div>
    );
  }

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

      <div className="max-w-7xl mx-auto pb-12 px-4 lg:px-0">
        <div className=" rounded-lg shadow-sm">
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
          />

          <div className="p-8">
            {activeTab === "privacy" && (
              <div className="prose prose-lg max-w-none">
                {documentToReactComponents(
                  policyData.fields.privacyPolicy,
                  richTextOptions
                )}
              </div>
            )}

            {activeTab === "terms" && (
              <div className="prose prose-lg max-w-none">
                {documentToReactComponents(
                  policyData.fields.termsOfUse,
                  richTextOptions
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
