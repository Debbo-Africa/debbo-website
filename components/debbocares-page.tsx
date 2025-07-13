import React from "react";
import { Breadcrumb } from "./breadcrumb";
import { PageHero } from "./page-hero";
import WideningAccessSection from "./widening-access-section";
import DebboAfricaHubSection from "./debbo-africa-hub-section";
import EmpoweringWomenSection from "./empowering-women-section";

const DebboCaresPage = () => {
  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "debbocares" }]}
      />
      <PageHero
        title={"DébboCares Foundation"}
        description=""
        imageSrc="/images/teams-hero.png"
        imageAlt="Faqs illustration"
        headingClassName="md:max-w-[3rem]"
      />

      <WideningAccessSection />
      <DebboAfricaHubSection/>
      <EmpoweringWomenSection />
    </div>
  );
};

export default DebboCaresPage;
