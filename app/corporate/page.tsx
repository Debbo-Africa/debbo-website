import Corporate from "@/components/corporate-page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Workplace wellness and testing in Africa. Partner With Us",
  description:
    "Collaborate with our laboratory for reliable corporate health screenings, workplace testing, and wellness programs — scalable, confidential, and efficient.",
  openGraph: {
    title: "Workplace wellness and testing in Africa. Partner With Us",
    description:
      "Collaborate with our laboratory for reliable corporate health screenings, workplace testing, and wellness programs — scalable, confidential, and efficient.",
    url: "https://www.debbo.africa/corporate",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Workplace wellness and testing in Africa. Partner With Us",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workplace wellness and testing in Africa. Partner With Us",
    description:
      "Collaborate with our laboratory for reliable corporate health screenings, workplace testing, and wellness programs — scalable, confidential, and efficient.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

const page = () => {
  return <Corporate />;
};

export default page;
