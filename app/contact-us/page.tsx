import ContactUs from "@/components/contact-us-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Your Company Name",
  description:
    "Get in touch with us for any inquiries, support, or feedback. We're here to help!",
  openGraph: {
    title: "Contact Us - DébboAfrica",
    description:
      "Get in touch with us for any inquiries, support, or feedback. We're here to help!",
    url: "https://debbo-africa.netlify.app/contact-us",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Us - Reach out to our team",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - DébboAfrica",
    description:
      "Get in touch with us for any inquiries, support, or feedback. We're here to help!",
    images: ["/contact-image.jpg"],
  },
};

const Page = () => {
  return <ContactUs />;
};

export default Page;
