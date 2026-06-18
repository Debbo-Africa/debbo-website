import { Stethoscope, Users, ClipboardList } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "Workforce Health Diagnostic",
    description:
      "We identify hidden health risks affecting productivity, absenteeism, and employee performance.",
  },
  {
    icon: Users,
    title: "Specialist Care Support",
    description:
      "Employees undergo onsite or coordinated health screenings, and guided care pathways toward appropriate medical care without confusion or delay.",
  },
  {
    icon: ClipboardList,
    title: "Workforce Health Reporting",
    description:
      "HR teams receive actionable insights that support planning, risk reduction, and productivity optimization.",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="bg-[#FFF5EB] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 font-serif">
          What We Do
        </h2>
        <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12 text-sm sm:text-base leading-relaxed">
          D&eacute;bboAfrica partners with HR and leadership teams to improve
          workforce performance through preventive healthcare, early risk
          detection, and coordinated follow-up care. We integrate screenings,
          specialist access, employee education, and workforce health reporting
          into one structured wellness system that helps you improve employee
          health outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[#F0E8DE] rounded-2xl p-8 flex flex-col gap-4"
            >
              <service.icon className="w-10 h-10 text-yellow stroke-[1.5]" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
