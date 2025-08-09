import BlogPage from "@/components/blog-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Débbo Africa Blog. Insights on Women’s Health in Africa",
  description:
    "From reproductive health to digital care, the Débbo Africa Blog shares insights that empower African women at every stage of life.",
  openGraph: {
    title: "Débbo Africa Blog. Insights on Women’s Health in Africa",
    description:
      "From reproductive health to digital care, the Débbo Africa Blog shares insights that empower African women at every stage of life.",
    url: "https://www.debbo.africa/resources/blog",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Débbo Africa Blog. Insights on Women’s Health in Africa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Débbo Africa Blog. Insights on Women’s Health in Africa",
    description:
      "From reproductive health to digital care, the Débbo Africa Blog shares insights that empower African women at every stage of life.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

export default function Page() {
  return <BlogPage />;
}
