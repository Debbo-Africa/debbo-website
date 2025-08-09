import FaqsPage from "@/components/faq-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Débbo Africa FAQs. Women’s Health in Africa Explained",
  description:
    "Find answers to common questions about Débbo Africa’s women’s health services, app features, and how we support care across Africa.",
  openGraph: {
    title: "Débbo Africa FAQs. Women’s Health in Africa Explained",
    description:
      "Find answers to common questions about Débbo Africa’s women’s health services, app features, and how we support care across Africa.",
    url: "https://www.debbo.africa/resources/faqs",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Débbo Africa FAQs. Women’s Health in Africa Explained",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Débbo Africa FAQs. Women’s Health in Africa Explained",
    description:
      "Find answers to common questions about Débbo Africa’s women’s health services, app features, and how we support care across Africa.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

export default function Page() {
  return <FaqsPage />;
}
