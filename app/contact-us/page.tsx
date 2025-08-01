import ContactUs from "@/components/contact-us-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get in Touch. Débbo Africa Women’s Health in Africa",
  description:
    "Have questions or need support? Contact Débbo Africa for information on our women’s health services, programs, and partnerships across Africa.",
  openGraph: {
    title: "Get in Touch. Débbo Africa Women’s Health in Africa",
    description:
      "Have questions or need support? Contact Débbo Africa for information on our women’s health services, programs, and partnerships across Africa.",
    url: "https://debbo-africa.netlify.app/contact-us",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Get in Touch. Débbo Africa Women’s Health in Africa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch. Débbo Africa Women’s Health in Africa",
    description:
      "Have questions or need support? Contact Débbo Africa for information on our women’s health services, programs, and partnerships across Africa.",
    images: ["/contact-image.jpg"],
  },
};

const Page = () => {
  return <ContactUs />;
};

export default Page;
