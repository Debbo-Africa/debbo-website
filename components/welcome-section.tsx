"use client";

import Image from "next/image";

export function WelcomeSection() {
  return (
    <section className="py-16 bg-[#FDF2E9]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center rounded-3xl overflow-hidden">
          <div className="lg:p-12">
            <h2 className="text-4xl font-serif mb-6">DébboDocs</h2>
            <p className="text-lg mb-8 text-[#333537]">
              We’re building a growing network of compassionate,
              forward-thinking medical professionals committed to transforming
              how African women experience care.
            </p>
            <p className="text-md mb-4">As a Débbo Doc, you will:</p>

            <div className="space-y-4">
              <div className="bg-[--surface-card] rounded-lg px-4 py-3 font-semibold text-body-text-gray">
                Deliver high-quality virtual or in-person care to women across
                the continent
              </div>
              <div className="bg-[--surface-card] rounded-lg px-4 py-3 font-semibold text-body-text-gray">
                Contribute to innovation in women’s health at the intersection
                of medicine and technology
              </div>
              <div className="bg-[--surface-card] rounded-lg px-3 py-2 font-semibold text-body-text-gray">
                Join a supportive clinical community that values flexibility,
                autonomy, and meaningful impact
              </div>
            </div>

            <button className="mt-6 mb-6 px-6 py-3 bg-black text-white rounded-full text-sm">
              Learn More →
            </button>
          </div>

          <div className="relative h-[400px] lg:h-[600px] group overflow-hidden">
            <Image
              src="/images/welcome-section.jpg"
              alt="Débbo Docs"
              fill
              className="object-cover rounded-3xl transform transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-black bg-opacity-20 rounded-3xl transition duration-500 "></div>

            <p className="absolute bottom-8 left-8 text-white text-lg max-w-sm z-10 transition duration-500 group-hover:scale-105">
              Whether you’re based in Nigeria or abroad, we welcome licensed
              female doctors from all specialties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
