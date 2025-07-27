import React from "react";
import { PageHero } from "./page-hero";
import { Breadcrumb } from "./breadcrumb";
import CollaborationSection from "./collaboration";

const BrandAliesPage = () => {
  return (
    <div className="min-h-screen mt-20 mx-2 md:mx-6">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Our Brand Allies" },
        ]}
      />
      <PageHero
        title={"Harnessing the Power of Collaboration"}
        description=""
        imageSrc="/images/alies.png"
        imageAlt="Faqs illustration"
        leftImageSrc="/images/brand-alies.png"
        headingClassName="md:max-w-[15rem] md:leading-relaxed"
        className="bg-secondary-debbo-dark1  rounded-3xl overflow-hidden py-20 md:py-24 lg:py-20 text-white "
      />
      <CollaborationSection />
    </div>
  );
};

export default BrandAliesPage;
