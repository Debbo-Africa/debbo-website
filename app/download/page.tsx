import DownloadPage from "@/components/download-page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Get the Débbo Africa App. Women's health at your fingertips",
  description:
    "Get the Débbo Africa app to manage your health, book consultations, and access women-focused care anytime, anywhere in Africa.",
  openGraph: {
    title: "Get the Débbo Africa App. Women's health at your fingertips",
    description:
      "Get the Débbo Africa app to manage your health, book consultations, and access women-focused care anytime, anywhere in Africa.",
    url: "https://www.debbo.africa/download",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Get the Débbo Africa App. Women's health at your fingertips",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get the Débbo Africa App. Women's health at your fingertips",
    description:
      "Get the Débbo Africa app to manage your health, book consultations, and access women-focused care anytime, anywhere in Africa.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

const page = () => {
  return <DownloadPage />;
};

export default page;
