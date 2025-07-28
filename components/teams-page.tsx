"use client";

import { useEffect, useState } from "react";
import client from "@/lib/contentful";
import type { TeamEntry, TeamSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { TeamCard } from "./team-card";

// Helper function to split teamMembers into rows
function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const entries: EntryCollection<TeamSkeleton> =
          await client.getEntries<TeamSkeleton>({
            content_type: "teams",
            order: "sys.createdAt" as any,
          });

        setTeamMembers(entries.items as TeamEntry[]);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mt-16">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Meet the Team" }]}
        />

        <PageHero
          title="Meet the team"
          description="Our exceptional team of female healthcare professionals is dedicated to delivering the highest standard of care. We understand that each woman is unique, and our team takes the time to listen and tailor treatment plans to your specific needs. With a shared passion for improving lives, we provide compassionate, patient-centred care throughout your healthcare journey."
          imageSrc="/images/teams-hero.png"
          imageAlt="Team illustration"
        />

        <div className="max-w-7xl mx-auto pb-12 px-4 lg:px-0">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-64 bg-[--surface-card] rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No team members found.</p>
            </div>
          ) : (
            (() => {
              const count = teamMembers.length;

              if (count === 3) {
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                      <TeamCard key={member.sys.id} member={member} />
                    ))}
                  </div>
                );
              }

              if (count === 4) {
                const rows = chunkArray(teamMembers, 2);
                return (
                  <div className="space-y-8">
                    {rows.map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                      >
                        {row.map((member) => (
                          <TeamCard key={member.sys.id} member={member} />
                        ))}
                      </div>
                    ))}
                  </div>
                );
              }

              if (count === 5) {
                const firstRow = teamMembers.slice(0, 3);
                const secondRow = teamMembers.slice(3);
                return (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {firstRow.map((member) => (
                        <TeamCard key={member.sys.id} member={member} />
                      ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {secondRow.map((member) => (
                        <TeamCard key={member.sys.id} member={member} />
                      ))}
                    </div>
                  </div>
                );
              }

              // Default layout for 6 and above: 3 per row
              const rows = chunkArray(teamMembers, 3);
              return (
                <div className="space-y-8">
                  {rows.map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                      {row.map((member) => (
                        <TeamCard key={member.sys.id} member={member} />
                      ))}
                    </div>
                  ))}
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}
