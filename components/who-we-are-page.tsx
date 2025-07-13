"use client";

import { Breadcrumb } from "./breadcrumb";
import { DismissibleBanner } from "./dismissable-banner";
import { OurStorySection } from "./our-story";
import { SmartHealthcareSection } from "./smart-health-section";
import { ValuesSection } from "./values-section";
import { WhatWeOfferSection } from "./what-we-offer";

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen">

      <div className="mt-16 md:mt-20">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Who We Are" }]}
        />
        <SmartHealthcareSection />
        <OurStorySection
          imageSrc="/images/our-story.png"
          imageAlt="DébboAfrica team members"
        />
        <ValuesSection />

        <WhatWeOfferSection />
      </div>
    </div>
  );
}