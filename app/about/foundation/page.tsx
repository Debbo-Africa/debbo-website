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
    url: "https://debbo-africa.netlify.app/about/foundation",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
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
    images: ["https://debbo-africa.netlify.app/contact-image.jpg"],
  },
};

const page = () => {
  return <DebboCaresPage />;
};

export default page;
