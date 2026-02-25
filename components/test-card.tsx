"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { MedicalTestEntry } from "@/types/contentful";
import Image from "next/image";

interface TestCardProps {
  test: MedicalTestEntry;
  hideCart?: boolean; // kept for compatibility, but not used
  isScan?: boolean;
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
      <li className="flex items-start gap-2 mb-2">
        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 bg-[#FFF8F0] rounded-full p-1" />
        <span className="text-sm text-body-text-gray">{children}</span>
      </li>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="space-y-2">{children}</ul>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-sm text-body-text-gray mb-2">{children}</p>
    ),
  },
};

const countTestsInRichText = (richText: any): number => {
  let count = 0;

  const countInNode = (node: any) => {
    if (node.nodeType === "list-item") count++;
    if (node.content) node.content.forEach(countInNode);
  };

  if (richText?.content) {
    richText.content.forEach(countInNode);
  }

  return count;
};

export function TestCard({ test, isScan = false }: TestCardProps) {
  const testCount = countTestsInRichText(test.fields.testList);
  const scanCount =
    test.fields.scan && typeof test.fields.scan === "object"
      ? countTestsInRichText(test.fields.scan)
      : 0;

  const finalCount = isScan && scanCount > 0 ? scanCount : testCount;

  return (
    <Card className="h-full flex flex-col bg-[--surface-card] border-none rounded-2xl md:rounded-3xl hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            {isScan && (
              <Image
                src={`https:${(test as any).fields?.image?.fields?.file.url}`}
                alt={(test as any).fields.image.fields.title}
                className="w-20 h-20 object-contain mb-2"
                width={80}
                height={80}
              />
            )}

            <h3 className="font-semibold text-md mb-1 max-w-[15rem]">
              {test?.fields?.testName}
            </h3>

            {test.fields.description && (
              <p className="text-body-text-gray mt-2 text-xs md:text-sm">
                {test.fields.description}
              </p>
            )}
          </div>

          {test?.fields?.category && (
            <span className="bg-[#FFF8F0] text-general-black px-3 py-1 rounded-full text-xs md:text-sm whitespace-nowrap inline-flex">
              {test?.fields?.category}
            </span>
          )}
        </div>

        <div className="mb-3 flex-grow space-y-4">
          {test?.fields?.testList &&
            documentToReactComponents(test.fields.testList, richTextOptions)}
        </div>
      </CardContent>
    </Card>
  );
}
