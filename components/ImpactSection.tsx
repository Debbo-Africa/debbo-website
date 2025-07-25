"use client";

import { ImpactStatsSection } from "./impart-stats-section";
import { InsuranceSection } from "./insurance-section";


export const ImpactSection = () => {
  return (
    <section className="relative w-full py-16 bg-gradient-to-br">
      <div className="max-w-7xl mx-auto px-4">
        <ImpactStatsSection />
        <InsuranceSection />
      </div>
    </section>
  );
};
