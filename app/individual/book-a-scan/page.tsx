import { BookScanPage } from "@/components/scan";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Expert Radiology for Women in Lagos. Mammography & Ultrasound",
  description:
    "Expert radiology care for women in a safe, comfortable setting. Advanced diagnostic imaging tailored to every stage of a woman’s health journey.",
  openGraph: {
    title: "Expert Radiology for Women in Lagos. Mammography & Ultrasound",
    description:
      "Expert radiology care for women in a safe, comfortable setting. Advanced diagnostic imaging tailored to every stage of a woman’s health journey.",
    url: "https://www.debbo.africa/individual/book-a-scan",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Expert Radiology for Women in Lagos. Mammography & Ultrasound",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Radiology for Women in Lagos. Mammography & Ultrasound",
    description:
      "Expert radiology care for women in a safe, comfortable setting. Advanced diagnostic imaging tailored to every stage of a woman’s health journey.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

export default function page() {
  return <BookScanPage />;
}
