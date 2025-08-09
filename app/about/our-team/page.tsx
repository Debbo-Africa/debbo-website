import TeamsPage from "@/components/teams-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team. Leaders in Women’s Health & Health Tech",
  description:
    "Débbo Africa's expert team is pioneering innovation in women’s health and health tech, driving impactful solutions for communities across Africa.",
  openGraph: {
    title: "Meet Our Team. Leaders in Women’s Health & Health Tech",

    description:
      "Débbo Africa's expert team is pioneering innovation in women’s health and health tech, driving impactful solutions for communities across Africa.",
    url: "https://www.debbo.africa/about/foundation",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Meet Our Team. Leaders in Women’s Health & Health Tech",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Team. Leaders in Women’s Health & Health Tech",
    description:
      "Débbo Africa's expert team is pioneering innovation in women’s health and health tech, driving impactful solutions for communities across Africa.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

export default function Page() {
  return <TeamsPage />;
}
