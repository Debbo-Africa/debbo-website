import React from "react";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import ContactSection from "./contact-section";

const ContactUs = () => {
  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
      />
      <PageHero
        title="We are here to care"
        description="Have a question, need assistance, or want to learn more about our healthcare services? We're here to help!"
        imageSrc="/images/faq.png"
        imageAlt="Faqs illustration"
      />
      <ContactSection />
    </div>
  );
};

export default ContactUs;
