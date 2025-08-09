import CareerPage from '@/components/career-page'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "Join Our Team. Build a Career Innovating Women’s Health in Africa",
  description:
    "Be part of something bigger at Débbo Africa. We're building a team of changemakers committed to making a lasting difference in Africa.",
  openGraph: {
    title: "Join Our Team. Build a Career Innovating Women’s Health in Africa",
    description:
      "Be part of something bigger at Débbo Africa. We're building a team of changemakers committed to making a lasting difference in Africa.",
    url: "https://www.debbo.africa/about/careers",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Join Our Team. Build a Career Innovating Women’s Health in Africa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Our Team. Build a Career Innovating Women’s Health in Africa",
    description:
      "Be part of something bigger at Débbo Africa. We're building a team of changemakers committed to making a lasting difference in Africa.",
    images: ["https://www.debbo.africa/contact-image.jpg"],
  },
};

const page = () => {
  return (
   <CareerPage/>
  )
}

export default page