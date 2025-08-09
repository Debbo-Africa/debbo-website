import WhoWeArePage from "@/components/who-we-are-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Are. Advancing Women’s Health in Africa",
  description:
    "Rooted in purpose and fueled by people, explore our story and how we’re driving meaningful change in Africa.",
  openGraph: {
    title: "Who We Are. Advancing Women’s Health in Africa",
    description:
      "Rooted in purpose and fueled by people, explore our story and how we’re driving meaningful change in Africa.",
    url: "https://www.debbo.africa/about/who-we-are",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Who We Are. Advancing Women’s Health in Africa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who We Are. Advancing Women’s Health in Africa",
    description:
      "Rooted in purpose and fueled by people, explore our story and how we’re driving meaningful change in Africa.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

export default function Page() {
  return <WhoWeArePage />;
}
