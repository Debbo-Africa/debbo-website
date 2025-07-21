"use client";
import { Breadcrumb } from "./breadcrumb";
import { EqualOpportunitySection } from "./equal-opportunity";
import { JobsSection } from "./job-section";
import { PageHero } from "./page-hero";
import { WelcomeSection } from "./welcome-section";

const CareerPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mt-16 md:mt-20">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Career" }]}
        />
        <PageHero
          title="At DébboAfrica, we value our people as our greatest asset."
          description="If you're driven to make a difference in healthcare, we invite you to join our team of talented professionals. Experience a rewarding career that combines your skills with a deep sense of purpose."
          imageSrc="/images/career.png"
          leftImageSrc="/images/career.png"
          imageAlt="page illustration"
          className="bg-yellow rounded-2xl mx-5 overflow-hidden py-20 md:py-24 lg:py-12 "
          headingClassName="text-white px-0 text-xl md:my-4"
          textClassName="text-white"
        />
      </div>
      <EqualOpportunitySection />
      <WelcomeSection />
      <JobsSection />
    </div>
  );
};

export default CareerPage;
