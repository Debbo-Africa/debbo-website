import React from 'react'
import { Breadcrumb } from './breadcrumb';
import HeroSection from './cororate-landing';
import FiveCSection from './five-c-section';
import { StatsSection } from './stats-counter';
import { PersonalisedCareSection } from './personalised-care';
import { TrustedBySection } from './truestedby';
import { LetsWorkTogetherSection } from './lets-work-together';

const Corporate = () => {
  return (
    <div className="min-h-screen mt-20">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "For Corporate" }]}
          />
          <HeroSection />
          <FiveCSection />
          <StatsSection />
          <PersonalisedCareSection />
          <TrustedBySection />
          <LetsWorkTogetherSection buttonLink='/contact-us' imageSrc='/images/sharps1.png'/>
    </div>
  );
}

export default Corporate