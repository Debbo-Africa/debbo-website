import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer-section";
import CursorFollower from "@/components/cursur-follow";

const recoleta = localFont({
  src: [
    {
      path: "./fonts/Recoleta-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-recoleta",
  display: "swap",
});

const outfit = localFont({
  src: [
    {
      path: "./fonts/Outfit-VariableFont_wght.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Outfit-VariableFont_wght.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Débbo Africa. Advancing Women's Health in Africa",
    template: "%s",
    
  },
  description:
    "Improving women's health in Africa with tech-enabled care, diagnostics, and wellness. Discover how Débbo Africa supports every stage of womanhood.",
  keywords: [
    "Women's health",
    "African women healthcare",
    "Healthcare gap",
    "Personalised care",
    "Quality healthcare",
    "digital healthcare for women",
    "ultrasound services for women",
    "women's health consultations",
    "women's health screening Africa",
    "lab testing for women",
    "reproductive health services Africa",
    "menopause support Africa",
    "PCOS care in Africa",
    "Débbo Africa",
    "women's wellness Africa",
    "healthcare technology Africa",
    "telemedicine for women",
    "women's health platform",
  ],
  authors: [{ name: "Débbo Africa" }],
  creator: "Débbo Africa",
  publisher: "Débbo Africa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Débbo Africa - Advancing Women's Health in Africa",
    description:
      "Tech-enabled healthcare solutions for African women. Quality care, diagnostics, and wellness support.",
    images: ["/images/5cs-woman1.jpg"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://debboafrica.com",
    title: "Débbo Africa - Advancing Women's Health in Africa",
    description:
      "Improving women's health in Africa with tech-enabled care, diagnostics, and wellness. Discover how Débbo Africa supports every stage of womanhood.",
    images: [
      {
        url: "/images/5cs-woman1.jpg",
        width: 1200,
        height: 630,
        alt: "Débbo Africa - Women's Health in Africa",
      },
    ],
    siteName: "Débbo Africa",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${recoleta.variable} ${outfit.variable}`}>
      <body
        className={`min-h-screen text-general-black transition-colors bg-badge ${outfit.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
        <div className="hidden lg:block">
          <CursorFollower />
        </div>
      </body>
    </html>
  );
}
