import React from "react";
import { Breadcrumb } from "./breadcrumb";
import DonwloadHeroSection from "./donwload-hero-section";
import HealthFeatureCards from "./health-feature-cards";
import HowItWorksAndFAQSection from "./download-faq-section";
import { LetsWorkTogetherSection } from "./lets-work-together";

const DownloadPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-20">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Download App" }]}
        />
        <DonwloadHeroSection />
        <HealthFeatureCards />
        <HowItWorksAndFAQSection />
        <LetsWorkTogetherSection
          download
          title="Rooted in Culture, Powered by Care"
          description="The MyDébbo app was built to feel like home. Because your health shouldn’t feel foreign — it should feel familiar, soft, and truly yours. Take one small step toward your wellness today."
        />
      </div>
    </div>
  );
};

export default DownloadPage;
