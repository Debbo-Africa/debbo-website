import BookTestPage from "@/components/book-a test";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Laboratory Services for Women’s Health & Wellness",
  description:
    "Debbo Africa’s lab offers expert fertility, hormone, menopause, and wellness testing tailored to women’s health needs.",
  openGraph: {
    title: "Laboratory Services for Women’s Health & Wellness",
    description:
      "Debbo Africa’s lab offers expert fertility, hormone, menopause, and wellness testing tailored to women’s health needs.",
    url: "https://www.debbo.africa/individual/book-a-test",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Laboratory Services for Women’s Health & Wellness",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratory Services for Women’s Health & Wellness",
    description:
      "Debbo Africa’s lab offers expert fertility, hormone, menopause, and wellness testing tailored to women’s health needs.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};
const BookATest = () => {
  return <BookTestPage />;
};

export default BookATest;
