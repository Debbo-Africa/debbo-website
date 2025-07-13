"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import type { TeamEntry } from "@/types/contentful";

interface TeamCardProps {
  member: TeamEntry;
}

export function TeamCard({ member }: TeamCardProps) {
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const extractLinkedInUrl = (linkedInField: any) => {
    if (!linkedInField?.content) return null;

    for (const content of linkedInField.content) {
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

  const imageUrl = (member as any).fields.image?.fields?.file?.url;
  const linkedInUrl = extractLinkedInUrl(member.fields.linkedInUrl);

  return (
    <div className="group relative rounded-3xl overflow-hidden min-h-[350px] bg-[--surface-card]">
      <div className="absolute left-0 right-0 bottom-0 h-44 bg-[url('/images/teams-bg.png')] bg-cover bg-no-repeat bg-bottom"></div>

      <div className="relative z-10 p-6 md:pr-48 text-left">
        <Link href={`/about/our-team/${createSlug(member.fields.name)}`}>
          <h3 className="font-bold text-lg text-general-black group-hover:text-gray-600 transition-colors">
            {member.fields.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600">{member.fields.qualifications}</p>
        <p className="text-sm font-medium text-gray-800">
          {member.fields.position}
        </p>

        {linkedInUrl && (
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 mt-2 text-gray-text rounded-lg transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Image on the right */}
      <Link href={`/about/our-team/${createSlug(member.fields.name)}`}>
        <div className="absolute right-0 bottom-0 w-44 md:w-56 h-44 md:h-56">
          {imageUrl && (
            <Image
              src={`https:${imageUrl}`}
              alt={member.fields.name}
              fill
              className="object-cover rounded-tl-3xl"
            />
          )}
        </div>
      </Link>
    </div>
  );
}
