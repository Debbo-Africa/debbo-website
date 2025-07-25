"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import client from "@/lib/contentful";
import type { TeamEntry, TeamSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Breadcrumb } from "./breadcrumb";

interface TeamDetailPageProps {
  slug: string;
}

export default function TeamDetailPage({ slug }: TeamDetailPageProps) {
  const [teamMember, setTeamMember] = useState<TeamEntry | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const entries: EntryCollection<TeamSkeleton> =
          await client.getEntries<TeamSkeleton>({
            content_type: "teams",
          });

        const allMembers = entries.items as TeamEntry[];
        const currentMember = allMembers.find(
          (member) => createSlug(member.fields.name) === slug
        );

        setTeamMember(currentMember || null);
      } catch (error) {
        console.error("Error fetching team member:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen mx-4 mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-10 pt-10 pb-0  rounded-2xl mt-10 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <div className="h-8 w-48 bg-[--surface-card] rounded mb-2" />
                <div className="h-6 w-32 bg-[--surface-card] rounded mb-2" />
                <div className="h-6 w-40 bg-[--surface-card] rounded mb-4" />
                <div className="h-10 w-10 bg-[--surface-card] rounded-full" />
              </div>
              <div className="hidden lg:block">
                <div className="space-y-3">
                  <div className="h-4 w-full bg-[--surface-card] rounded" />
                  <div className="h-4 w-5/6 bg-[--surface-card] rounded" />
                  <div className="h-4 w-3/4 bg-[--surface-card] rounded" />
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end md:mt-44">
              <div className="relative w-80 h-80 bg-[--surface-card] rounded-2xl" />
            </div>
          </div>
        </div>
        <div className="px-6 py-16  lg:hidden mt-6 rounded-2xl animate-pulse space-y-3">
          <div className="h-4 w-full bg-[--surface-card] rounded" />
          <div className="h-4 w-5/6 bg-[--surface-card] rounded" />
          <div className="h-4 w-3/4 bg-[--surface-card] rounded" />
        </div>
      </div>
    );
  }

  if (!teamMember) {
    return (
      <div className="min-h-screen mt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-general-black mb-4">
            Team Member Not Found
          </h1>
          <p className="text-gray-text mb-6">
            The team member you're looking for doesn't exist.
          </p>
          <Link href="/about/our-team">
            <button className="bg-general-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Back to Team
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = (teamMember as any).fields.image?.fields?.file?.url;
  const linkedInUrl = extractLinkedInUrl(teamMember.fields.linkedInUrl);

  return (
    <div className="min-h-screen mx-4">
      <div className="mt-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Meet the Team", href: "/about/our-team" },
            { label: teamMember.fields.name },
          ]}
        />

        <div className="max-w-6xl mx-auto px-4 md:px-10 pt-10 pb-0 bg-[--surface-card] rounded-2xl mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-general-black mb-2">
                  {teamMember.fields.name}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  {teamMember.fields.qualifications}
                </p>
                <p className="text-lg font-medium text-gray-800 mb-4">
                  {teamMember.fields.position}
                </p>

                {linkedInUrl && (
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-text px-4 py-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="hidden lg:block">
                <p className="text-gray-text leading-relaxed text-lg">
                  {teamMember.fields.about}
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end md:mt-44">
              <div className="relative w-80 h-80">
                {imageUrl && (
                  <Image
                    src={`https:${imageUrl}`}
                    alt={teamMember.fields.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-16 bg-[--surface-card] lg:hidden mt-6 rounded-2xl">
          <p className="text-gray-text leading-relaxed text-lg">
            {teamMember.fields.about}
          </p>
        </div>
      </div>
    </div>
  );
}
