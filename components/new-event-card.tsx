"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsEventsEntry } from "@/types/contentful";
import { BLOCKS } from "@contentful/rich-text-types";

interface NewsEventCardProps {
  item: NewsEventsEntry;
  layout?: "list" | "grid";
}



export function NewsEventCard({ item, layout = "list" }: NewsEventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const extractLinkUrl = (linkField: any) => {
    if (!linkField || !linkField.content) return null;

    for (const content of linkField.content) {
      if (content.content) {
        for (const innerContent of content.content) {
          if (innerContent.nodeType === "hyperlink" && innerContent.data?.uri) {
            return innerContent.data.uri;
          }
        }
      }
    }
    return null;
  };

  const imageUrl = (item as any).fields.image?.fields?.file?.url;
  const tagImageUrl = (item as any).fields.tagImage?.fields?.file?.url;
  const linkUrl = extractLinkUrl(item.fields.link);

  const handleLearnMoreClick = () => {
    if (linkUrl) {
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (layout === "grid") {
    return (
      <div className="w-full mb-8">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="w-full md:w-80 flex-shrink-0">
            {imageUrl && (
              <div className="aspect-video md:aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src={`https:${imageUrl}`}
                  alt={item.fields.description}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-body-text-gray" />
                <span className="text-sm text-body-text-gray">
                  {formatDate(item.fields.event_date)}
                </span>
              </div>

              <h3 className="font-semibold text-xl md:text-2xl text-general-black mb-4 leading-tight ">
                {item.fields.description}
              </h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {tagImageUrl && (
                  <Image
                    src={`https:${tagImageUrl}`}
                    alt={item.fields.tag}
                    width={16}
                    height={16}
                    className="rounded"
                  />
                )}
                <span className="text-sm text-body-text-gray">
                  {item.fields.tag}
                </span>
              </div>

              <Button
                variant="link"
                className="text-body-text-gray hover:text-general-black p-0 h-auto underline"
                onClick={handleLearnMoreClick}
                disabled={!linkUrl}
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="w-full md:w-72 flex-shrink-0">
          {imageUrl && (
            <div className="aspect-video md:aspect-[3/2] relative rounded-2xl overflow-hidden">
              <Image
                src={`https:${imageUrl}`}
                alt={item.fields.description}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-body-text-gray" />
              <span className="text-sm text-body-text-gray">
                {formatDate(item.fields.event_date)}
              </span>
            </div>

            <h3 className="font-semibold text-xl md:text-2xl text-general-black mb-4 leading-tight max-w-sm">
              {item.fields.description}
            </h3>
          </div>

          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-2 bg-[--surface-card] rounded-xl p-2">
              {tagImageUrl && (
                <Image
                  src={`https:${tagImageUrl}`}
                  alt={item.fields.tag}
                  width={16}
                  height={16}
                  className="rounded"
                />
              )}
              <span className="text-sm text-gray-600">{item.fields.tag}</span>
            </div>

            <Button
              variant="link"
              className="text-body-text-gray hover:text-general-black p-0 h-auto underline"
              onClick={handleLearnMoreClick}
              disabled={!linkUrl}
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
