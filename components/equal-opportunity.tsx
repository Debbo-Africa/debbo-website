"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export function EqualOpportunitySection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const animateCards = () => {
      const cards = cardsRef.current?.querySelectorAll(".equal-card");
      if (!cards || cards.length === 0) {
        console.log("No cards found for animation");
        return;
      }


      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      gsap.set(cards, {
        y: 60,
        opacity: 0,
      });

      // Create new timeline
      timelineRef.current = gsap.timeline();

      timelineRef.current.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
      });
    };

    const rafId = requestAnimationFrame(() => {
      setTimeout(animateCards, 100);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-serif mb-12 max-w-2xl mx-auto">
          Débbo Africa is an equal opportunity employer.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={cardsRef}>
          {/* Card 1 */}
          <div className="equal-card  bg-[--surface-card] rounded-2xl p-8 text-left transform transition duration-300 hover:scale-105 shadow-sm">
            <Image
              src="/images/our-team.svg"
              alt="Collaborate"
              width={40}
              height={40}
              className="mb-4"
              priority
            />
            <h3 className="text-xl font-semibold mb-2">Collaborate</h3>
            <p className="text-body-text-gray">
              As part of our team, you'll collaborate with dedicated
              professionals who share the goal of delivering exceptional care.
            </p>
          </div>

          {/* Card 2 */}
          <div className="equal-card  bg-[--surface-card] rounded-2xl p-8 text-left transform transition duration-300 hover:scale-105 shadow-sm">
            <Image
              src="/images/who-we-are.svg"
              alt="Support"
              width={40}
              height={40}
              className="mb-4"
              priority
            />
            <h3 className="text-xl font-semibold mb-2">Support</h3>
            <p className="text-body-text-gray">
              We believe that providing employees with the right tools,
              resources, and opportunities is vital to their professional
              success and overall well-being.
            </p>
          </div>

          {/* Card 3 */}
          <div className="equal-card bg-[--surface-card] rounded-2xl p-8 text-left transform transition duration-300 hover:scale-105 shadow-sm">
            <Image
              src="/images/Signup.svg"
              alt="Innovation"
              width={40}
              height={40}
              className="mb-4"
              priority
            />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-body-text-gray">
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
