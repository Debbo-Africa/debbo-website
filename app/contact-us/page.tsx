import ContactUs from "@/components/contact-us-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Your Company Name",
  description:
    "Get in touch with us for any inquiries, support, or feedback. We're here to help!",
  openGraph: {
    title: "Contact Us - Your Company Name",
    description:
      "Get in touch with us for any inquiries, support, or feedback. We're here to help!",
    url: "https://www.debbo.africa/contact-us",
    siteName: "Your Company Name",
    images: [
      {
        url: "https://www.debbo.africa/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Us - Reach out to our team",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Your Company Name",
    description:
      "Get in touch with us for any inquiries, support, or feedback. We're here to help!",
    images: ["/contact-image.jpg"],
  },
};

const Page = () => {
  return <ContactUs />;
};

export default Page;
