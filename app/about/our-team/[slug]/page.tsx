import TeamDetailPage from "@/components/team-detail-page";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <TeamDetailPage slug={params.slug} />;
}
