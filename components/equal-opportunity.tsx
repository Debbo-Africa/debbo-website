"use client";

import Image from "next/image";

export function EqualOpportunitySection() {
  return (
    <section className="py-16 bg-[#FDF2E9]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif mb-12 max-w-2xl mx-auto">
          Débbo Africa is an equal opportunity employer.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[--surface-card] rounded-2xl p-8 text-left transform transition duration-300 hover:scale-105">
            <Image
              src="/images/our-team.svg"
              alt="Collaborate"
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
            <p className="text-[#333537]">
              As part of our team, you'll collaborate with dedicated
              professionals who share the goal of delivering exceptional care.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[--surface-card] rounded-2xl p-8 text-left transform transition duration-300 hover:scale-105">
            <Image
              src="/images/who-we-are.svg"
              alt="Support"
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-[#333537]">
              We believe that providing employees with the right tools,
              resources, and opportunities is vital to their professional
              success and overall well-being.
            </p>
          </div>

          <div className="bg-[--surface-card] rounded-2xl p-8 text-left transform transition duration-300 hover:scale-105">
            <Image
              src="/images/Signup.svg"
              alt="Innovation"
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-[#333537]">
              We are committed to fostering a culture of innovation that fuels
              creativity, problem-solving, and growth by offering exciting
              opportunities for professional development and career advancement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
