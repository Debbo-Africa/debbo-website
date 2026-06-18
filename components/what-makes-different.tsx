import { Heart, ShieldCheck, Globe, BarChart3 } from "lucide-react";

const differentiators = [
  {
    icon: Heart,
    title: "Deliver Continuous Care",
    description:
      "We ensure employees are guided through to diagnosis, specialist care and follow-up support that improve actual health outcomes.",
  },
  {
    icon: ShieldCheck,
    title: "Preventive-First Model",
    description:
      "We help organizations prevent productivity loss before it happens through early detection and structured intervention.",
  },
  {
    icon: Globe,
    title: "Built for African Workforce Realities",
    description:
      "Our programmes are designed around African workplace structures, healthcare access gaps, and employee wellbeing challenges.",
  },
  {
    icon: BarChart3,
    title: "Measurable Business Impact",
    description:
      "We connect employee health outcomes directly to absenteeism reduction, productivity gains, and workforce stability.",
  },
];

export default function WhatMakesDifferentSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12">
          What Makes D&eacute;bboAfrica Different
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="bg-[--surface-card] rounded-2xl p-8 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-yellow/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-yellow stroke-[1.5]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
