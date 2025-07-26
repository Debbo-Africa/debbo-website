"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const words = [
  "Empowering",
  "Supporting",
  "Uplifting",
  "Inspiring",
  "Transforming",
];

export default function HeroSection() {
  const animatedWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let currentWordIndex = 0;
    let isPageVisible = true;
    let isTyping = false;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !isTyping) typeWord(words[currentWordIndex]);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const typeWord = async (word: string) => {
      if (!animatedWordRef.current) return;
      isTyping = true;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
      animatedWordRef.current.textContent = "";

      for (let i = 0; i <= word.length; i++) {
        if (!isPageVisible) return (isTyping = false);
        animatedWordRef.current.textContent = word.substring(0, i);
        await sleep(150);
      }

      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      await sleep(2000);
      await eraseWord();
    };

    const eraseWord = async () => {
      if (!animatedWordRef.current) return;
      const word = animatedWordRef.current.textContent || "";

      if (cursorRef.current) cursorRef.current.style.opacity = "0";

      for (let i = word.length; i >= 0; i--) {
        if (!isPageVisible) return (isTyping = false);
        animatedWordRef.current.textContent = word.substring(0, i);
        await sleep(100);
      }

      if (cursorRef.current) cursorRef.current.style.opacity = "1";
      currentWordIndex = (currentWordIndex + 1) % words.length;
      await sleep(500);
      await typeWord(words[currentWordIndex]);
    };

    typeWord(words[currentWordIndex]);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 text-center lg:text-left">
      <div className="max-w-7xl  mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 ">
          <h1 className="text-4xl lg:text-6xl font-bold leading-relaxed text-general-black mb-6">
            <h1 className="flex mb-1 justify-center lg:justify-start">
              <h1 ref={animatedWordRef as any} className="text-yellow "></h1>
              <h1 ref={cursorRef as any} className="animate-blink text-yellow">
                |
              </h1>
              &nbsp;Your
            </h1>
            Workforce with <br /> Better Health
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            At DébboAfrica, we believe your team is your greatest asset. Our
            corporate wellness plans are designed to support employee health,
            boost productivity, and build stronger organisations.
          </p>
        </div>

        <div className="hidden lg:block lg:w-1/2 rounded-xl overflow-hidden">
          <Image
            src="/images/hero-grid.png"
            alt="Corporate wellness team"
            width={600}
            height={400}
            className="rounded-lg w-full  transform transition duration-500 hover:scale-105"
            priority
          />
        </div>
        <div className="hidden md:block lg:hidden lg:w-1/2 rounded-xl overflow-hidden">
          <Image
            src="/images/hero-grid.png"
            alt="Corporate wellness team"
            width={600}
            height={400}
            className="rounded-lg w-full  transform transition duration-500 hover:scale-105"
            priority
          />
        </div>
        <div className="md:hidden lg:w-1/2 rounded-xl overflow-hidden">
          <Image
            src="/images/hero-grid-small.png"
            alt="Corporate wellness team"
            width={600}
            height={400}
            className="rounded-lg w-full  transform transition duration-500 hover:scale-105"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
