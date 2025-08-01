import GlossaryPage from "@/components/glossary-page";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Glossary of Women’s Health Terms. Débbo Africa",
  description:
    "Need clarity on women’s health terms? Our glossary explains medical, wellness, and tech concepts to support informed care decisions..",
  openGraph: {
    title: "Glossary of Women’s Health Terms. Débbo Africa",
    description:
      "Need clarity on women’s health terms? Our glossary explains medical, wellness, and tech concepts to support informed care decisions..",
    url: "https://debbo-africa.netlify.app/resources/glossary",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Glossary of Women’s Health Terms. Débbo Africa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary of Women’s Health Terms. Débbo Africa",
    description:
      "Need clarity on women’s health terms? Our glossary explains medical, wellness, and tech concepts to support informed care decisions..",
    images: ["https://debbo-africa.netlify.app/contact-image.jpg"],
  },
};
export default function Page() {

  return <GlossaryPage />;
}
