import NewsEventsPage from "@/components/new-event-page";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Débbo Africa News & Events. Women’s Health in Africa",
  description:
    "Explore recent updates, community events, and health initiatives by Débbo Africa, all focused on empowering African women’s health.",
  openGraph: {
    title: "Débbo Africa News & Events. Women’s Health in Africa",
    description:
      "Explore recent updates, community events, and health initiatives by Débbo Africa, all focused on empowering African women’s health.",
    url: "https://debbo-africa.netlify.app/resources/news-and-event",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Débbo Africa News & Events. Women’s Health in Africa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Débbo Africa News & Events. Women’s Health in Africa",
    description:
      "Explore recent updates, community events, and health initiatives by Débbo Africa, all focused on empowering African women’s health.",
    images: ["https://debbo-africa.netlify.app/contact-image.jpg"],
  },
};

export default function Page() {
  return <NewsEventsPage />;
}
