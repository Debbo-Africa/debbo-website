import DebboCaresPage from "@/components/debbocares-page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Empowering African Women. Débbo Africa Foundation",
  description:
    "Débbo Africa Foundation is a women’s health nonprofit empowering African women with access to care, health tech, and community-based wellness support.",
  openGraph: {
    title: "Empowering African Women. Débbo Africa Foundation",

    description:
      "Débbo Africa Foundation is a women’s health nonprofit empowering African women with access to care, health tech, and community-based wellness support.",
    url: "https://www.debbo.africa/about/foundation",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Empowering African Women. Débbo Africa Foundation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Empowering African Women. Débbo Africa Foundation",
    description:
      "Débbo Africa Foundation is a women’s health nonprofit empowering African women with access to care, health tech, and community-based wellness support.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

const page = () => {
  return <DebboCaresPage />;
};

export default page;
