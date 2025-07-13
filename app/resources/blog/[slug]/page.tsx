import BlogDetailPage from "@/components/blog-details-page";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <BlogDetailPage slug={params.slug} />;
}
