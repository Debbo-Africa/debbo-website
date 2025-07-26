import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
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
  title: "DébboAfrica - Empowering African Women Through Smart Health",
  description: "Cutting-Edge Care for African Women's Health",
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
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <div className="hidden lg:block">
            <CursorFollower />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
