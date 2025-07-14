import React from "react";
import { Breadcrumb } from "./breadcrumb";
import DonwloadHeroSection from "./donwload-hero-section";
import HealthFeatureCards from "./health-feature-cards";

const DownloadPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-20">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Donnload App"},
          ]}
              />
              <DonwloadHeroSection />
              <HealthFeatureCards/>
      </div>
    </div>
  );
};

export default DownloadPage;
