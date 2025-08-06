import PrivacyPolicy from '@/components/privacy-policy'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Your Data, Your Privacy. Débbo Africa Policy Page",
  description:
    "Learn how Débbo Africa collects, uses, and protects your personal data. We’re committed to safeguarding your privacy in all women’s health services.",
  openGraph: {
    title: "Your Data, Your Privacy. Débbo Africa Policy Page",
    description:
      "Learn how Débbo Africa collects, uses, and protects your personal data. We’re committed to safeguarding your privacy in all women’s health services.",
    url: "https://debbo-africa.netlify.app/privacy-policy",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Your Data, Your Privacy. Débbo Africa Policy Page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Data, Your Privacy. Débbo Africa Policy Page",
    description:
      "Learn how Débbo Africa collects, uses, and protects your personal data. We’re committed to safeguarding your privacy in all women’s health services.",
    images: ["https://debbo-africa.netlify.app/contact-image.jpg"],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
