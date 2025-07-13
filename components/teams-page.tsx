"use client";

import { useEffect, useState } from "react";
import client from "@/lib/contentful";
import type { TeamEntry, TeamSkeleton } from "@/types/contentful";
import type { EntryCollection } from "contentful";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import { TeamCard } from "./team-card";

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

  // Smart grid layout logic
  const getGridLayout = (count: number) => {
    if (count === 1) return { rows: [[0]] };
    if (count === 2) return { rows: [[0, 1]] };
    if (count === 3) return { rows: [[0], [1, 2]] };
    if (count === 4)
      return {
        rows: [
          [0, 1],
          [2, 3],
        ],
      };
    if (count === 5)
      return {
        rows: [
          [0, 1],
          [2, 3, 4],
        ],
      };
    if (count === 6)
      return {
        rows: [
          [0, 1, 2],
          [3, 4, 5],
        ],
      };

    const rows: number[][] = [];
    let currentIndex = 0;

    while (currentIndex < count) {
      const remaining = count - currentIndex;
      if (remaining >= 3) {
        rows.push([currentIndex, currentIndex + 1, currentIndex + 2]);
        currentIndex += 3;
      } else if (remaining === 2) {
        rows.push([currentIndex, currentIndex + 1]);
        currentIndex += 2;
      } else {
        rows.push([currentIndex]);
        currentIndex += 1;
      }
    }

    return { rows };
  };

 

  const layout = getGridLayout(teamMembers.length);

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
          {teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No team members found.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {layout.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid gap-8 ${
                    row.length === 1
                      ? "grid-cols-1 max-w-4xl mx-auto"
                      : row.length === 2
                      ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {row.map((memberIndex) => (
                    <TeamCard
                      key={teamMembers[memberIndex].sys.id}
                      member={teamMembers[memberIndex]}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
