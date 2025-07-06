import type React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Black.otf",
      weight: "50",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-BlackItalic.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-BoldItalic.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Italic.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Light.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-LightItalic.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-MediumItalic.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Regular.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
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
    <html lang="en" className={`${dmSans.variable} ${satoshi.variable}`}>
      <body className="min-h-screen bg-general-white  text-general-black  transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}


