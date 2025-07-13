import GlossaryDetailPage from "@/components/glossary-details-page";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <GlossaryDetailPage slug={params.slug} />;
}
