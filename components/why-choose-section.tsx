"use client";

import { Award, Users, FileText, Shield, User, CircleCheck } from "lucide-react";

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
        "From your first symptom to your follow-up plan, we’re with you every step of the way. No loose ends, no guesswork.",
    },
    {
      id: 4,
      icon: CircleCheck,
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
  ];

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why Choose DébboAfrica
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#F2E9DD] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-orange-500">
                  <Award className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {features[0].title}
                </h3>
              </div>
              <p className="text-[#6B6B6B] text-md  leading-relaxed">
                {features[0].description}
              </p>
            </div>

            <div className="bg-[#F2E9DD] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-orange-500">
                  <Users className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {features[1].title}
                </h3>
              </div>
              <p className="text-[#6B6B6B] text-md  leading-relaxed">
                {features[1].description}
              </p>
            </div>

            <div className="bg-[#F2E9DD] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-orange-500">
                  <FileText className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {features[2].title}
                </h3>
              </div>
              <p className="text-[#6B6B6B] text-md leading-relaxed">
                {features[2].description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F2E9DD] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-orange-500">
                  <CircleCheck className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {features[3].title}
                </h3>
              </div>
              <div className="text-[#6B6B6B] text-md leading-relaxed space-y-4">
                <p>
                  Our HEFAMAA-certified lab adheres to the highest clinical
                  standards. We take the privacy and confidentiality of user
                  data extremely seriously, especially because we're dealing
                  with sensitive women's health information.
                </p>
                <p>
                  We are Nigerian Data Protection Regulation (NDPR) compliant,
                  and follow data protection best practices to ensure that your
                  health information is safe and secure.
                </p>
              </div>
            </div>

            <div className="bg-[#F2E9DD] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-orange-500">
                  <User className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {features[4].title}
                </h3>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  At Débbo Africa, our tech-enabled care is not just
                  evidence-based, it's designed by African women, for African
                  women.
                </p>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
