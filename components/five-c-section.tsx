import Image from "next/image";
import { Check } from "lucide-react";

export default function FiveCSection() {
  return (
    <section className=" py-12 px-2 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row rounded-2xl overflow-hidden bg-[#d9542c] relative">
        <div className="absolute left-0 right-0 bottom-0 lg:top-0 bg-[url('/images/footer-bg.png')] opacity-20 bg-center h-80 "></div>

        <div className="relative z-10 lg:w-[45%] px-4 py-10 md:p-10 text-white">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
            We’re built on the 5 C’s
          </h2>
          <ul className="space-y-4 text-sm sm:text-base">
            {[
              {
                title: "Credible",
                desc: "Evidence-based and doctor-led care",
              },
              {
                title: "Convenient",
                desc: "Access care from anywhere",
              },
              {
                title: "Comprehensive",
                desc: "End-to-end care, from testing to follow-up",
              },
              {
                title: "Compliant",
                desc: "Certified, secure, and data-responsible",
              },
              {
                title: "Culturally Competent",
                desc: "Built by African women, for African women",
              },
            ].map((item) => (
              <li key={item.title} className="flex  gap-3 items-center">
                <span className="bg-white text-[#d9542c] rounded-full p-1">
                  <Check size={12} />
                </span>
                <div>
                  <span className="font-bold block">{item.title}</span>
                  <span className="block">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-white/90 text-sm">
            When your people feel their best, they do their best, and we’re here
            to help make that happen.
          </p>
        </div>

        {/* Image */}
        <div className="relative z-10  lg:w-[55%] w-full flex items-end">
          <Image
            src="/images/5cs-woman.png"
            alt="Smiling businesswoman"
            width={800}
            height={700}
            className="w-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
