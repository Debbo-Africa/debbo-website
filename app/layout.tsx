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
    default: "DébboAfrica - Empowering African Women with Smart Health",
    template: "%s - Health",
  },
  description: "Cutting-Edge Care for African Women's Health",
  icons: {
    icon: "/images/favicon.svg",
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    images: "/images/5cs-woman1.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
