import ContactUs from "@/components/contact-us-page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact Us",
};

const page = () => {
  return <ContactUs />;
};

export default page;
