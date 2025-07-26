"use client";

import { Breadcrumb } from "@/components/breadcrumb";
import { TestHeader } from "@/components/test-header";

import { InsuranceSection } from "@/components/insurance-section";
import CareCategoriesSection from "@/components/careCategory";
import BookAppointment from "@/components/book-appointment";
import ContraceptionTable from "@/components/contreption-table";
import LetsWorkTogetherSection from "@/components/lets-work-together";


export default function SpeakToDoctor() {
  

 




  return (
    <div className="min-h-screen pt-20">
      <TestHeader />

      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Speak to a Doctor" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CareCategoriesSection />
        <BookAppointment />
        <ContraceptionTable />
        <LetsWorkTogetherSection
          title="Need a vaccine?"
          description="Protect your health with our recommended vaccines for long-term disease prevention. We offer safe, medically approved options for adults and eligible adolescents. Contact us to learn more or book an appointment."
          imageSrc="/images/speak-to-a-doctor.png"
        />
        <InsuranceSection />
      </div>
    </div>
  );
}
