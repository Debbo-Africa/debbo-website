"use client";

import { Award, Users, FileText, Shield, User, Video } from "lucide-react";

export const WhyChooseSection = () => {
  const features = [
    {
      id: 1,
      icon: Award,
      title: "Credible",
      description:
        "Everything we do is grounded in evidence and reviewed by doctors, because your care deserves nothing less.",
    },
    {
      id: 2,
      icon: Users,
      title: "Convenient",
      description:
        "Schedule virtual consultations with gynaecologists/other medical specialists, book blood tests, and get health answers, all from your phone. Home or clinic options available.",
    },
    {
      id: 3,
      icon: FileText,
      title: "Comprehensive",
      description:
        "From your first symptom to your follow-up plan, we're with you every step of the way. No loose ends, no guesswork.",
    },
    {
      id: 4,
      icon: Shield,
      title: "Compliant",
      description:
        "Our HEFAMAA-certified medical laboratory adheres to the highest clinical standards. We are Nigerian Data Protection Regulation (NDPR) compliant, and follow data protection best practices to ensure that your health information is safe and secure.",
    },
    {
      id: 5,
      icon: User,
      title: "Culturally Competent",
      description:
        "At Débbo Africa, our tech-enabled care is not just evidence-based, it's designed by African women, for African women.\n\nWe listen without judgment and deliver care that fits around your life, on your terms, and in your time. We see you, we hear you, and we're here for you.",
    },
    {
      id: 6,
      icon: Video,
      title: "Consultation",
      description:
        "Book blood tests and receive health answers, all from your phone. Home or clinic options available.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose DébboAfrica
          </h2>
        </div>

        {/* Responsive Grid: 1 column on small, 3 columns on medium+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="bg-[#F2E9DD] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 text-orange-500">
                    <IconComponent className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <div className="text-[#6B6B6B] text-md leading-relaxed space-y-4">
                  {feature.description.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
