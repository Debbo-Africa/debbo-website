
import { Metadata } from "next";
import ContactADoctor from "@/components/contact-a-doctor";

export const metadata: Metadata = {
  title: "Consult a Doctor. Specialized Women’s Health Care ",
  description:
    "Convenient and accessible virtual consultations with a medical officer or consultant including gynaecologist, endocrinologist, dermatologist, mental health specialist",
  openGraph: {
    title: "Consult a Doctor. Specialized Women’s Health Care",
    description:
      "Convenient and accessible virtual consultations with a medical officer or consultant including gynaecologist, endocrinologist, dermatologist, mental health specialist",

    url: "https://debbo-africa.netlify.app/individual/contact-a-doctor",
    siteName: "DébboAfrica",
    images: [
      {
        url: "https://debbo-africa.netlify.app/contact-image.jpg",
        width: 1200,
        height: 630,
        alt: "Consult a Doctor. Specialized Women’s Health Care",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Consult a Doctor – Specialized Women’s Health Support | DébboAfrica",
    description:
      "Speak to licensed specialists in gynaecology, dermatology, endocrinology, and mental health. Get trusted virtual care tailored to women’s health.",
    images: ["https://debbo-africa.netlify.app/contact-image.jpg"],
  },
};
export default function SpeakToDoctor() {

  return (
   <ContactADoctor/>
  );
}
