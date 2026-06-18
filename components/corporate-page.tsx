import React from "react";
import { Breadcrumb } from "./breadcrumb";
import HeroSection from "./cororate-landing";
import WhatWeDoSection from "./what-we-do-section";
import FiveCSection from "./five-c-section";
import { StatsSection } from "./stats-counter";
import { PersonalisedCareSection } from "./personalised-care";
import { TrustedBySection } from "./truestedby";
import { CorporateMetrics } from "./corporate-metrics";
import { LetsWorkTogetherSection } from "./lets-work-together";

const Corporate = () => {
  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "For Corporate" }]}
      />
      <HeroSection />
      <WhatWeDoSection />
      <FiveCSection />
      <StatsSection />
      {/* <PersonalisedCareSection /> */}
      <TrustedBySection />
      <CorporateMetrics />
      <LetsWorkTogetherSection
        title="Your workforce is already feeling the impact."
        description="Are you addressing it early or paying for it later?"
        buttonText="Book a Discovery Call"
        buttonLink=""
        openCorporateBooking
        imageSrc="/images/sharps1.png"
      />
    </div>
  );
};

export default Corporate;
