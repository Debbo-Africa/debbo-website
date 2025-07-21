import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer-section";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const recoleta = localFont({
  src: [
    {
      path: "./fonts/Recoleta-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-recoleta",
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
    <html lang="en" className={`${dmSans.variable} ${recoleta.variable}`}>
      <body className="min-h-screen   text-general-black  transition-colors bg-badge">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}


