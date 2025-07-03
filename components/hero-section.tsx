"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ButtonComponent from "./Button";

export default function HeroSection() {
  const animatedWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const words = [
      "Empowering",
      "Supporting",
      "Uplifting",
      "Inspiring",
      "Transforming",
    ];
    let currentWordIndex = 0;
    let isPageVisible = true;
    let isTyping = false;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !isTyping) {
        typeWord(words[currentWordIndex]);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const typeWord = async (word: string) => {
      if (!animatedWordRef.current) return;
      isTyping = true;

      // Hide cursor during typing
      if (cursorRef.current) cursorRef.current.style.opacity = "0";

      animatedWordRef.current.textContent = "";

      for (let i = 0; i <= word.length; i++) {
        if (!isPageVisible) {
          isTyping = false;
          return;
        }
        if (animatedWordRef.current) {
          animatedWordRef.current.textContent = word.substring(0, i);
        }
        await sleep(150);
      }

      // Show blinking cursor after typing finishes
      if (cursorRef.current) cursorRef.current.style.opacity = "1";

      await sleep(2000); // pause before erase
      await eraseWord();
    };

    const eraseWord = async () => {
      if (!animatedWordRef.current) return;

      const word = animatedWordRef.current.textContent || "";

      // Hide cursor during erasing
      if (cursorRef.current) cursorRef.current.style.opacity = "0";

      for (let i = word.length; i >= 0; i--) {
        if (!isPageVisible) {
          isTyping = false;
          return;
        }
        if (animatedWordRef.current) {
          animatedWordRef.current.textContent = word.substring(0, i);
        }
        await sleep(100);
      }

      // Show blinking cursor after erasing finishes (before next word starts typing)
      if (cursorRef.current) cursorRef.current.style.opacity = "1";

      currentWordIndex = (currentWordIndex + 1) % words.length;
      await sleep(500); // small pause before next typing
      await typeWord(words[currentWordIndex]);
    };

    typeWord(words[currentWordIndex]);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section className="pt-32 sm:pt-44 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold text-[#0D0D0D] mb-6 leading-normal">
          <div className="flex flex-col md:flex-row md:items-center">
            <span
              className="flex items-center text-[#FF9B33] md:mr-2"
              style={{ fontFamily: "DM Serif Display, serif" }}
            >
              <span ref={animatedWordRef}></span>
              <span
                ref={cursorRef}
                className="ml-1 animate-blink"
                style={{ fontFamily: "monospace", opacity: 0 }}
              >
                |
              </span>
            </span>
            <span style={{ fontFamily: "DM Serif Display, serif" }}>
              African Women
            </span>
          </div>
          <span style={{ fontFamily: "DM Serif Display, serif" }}>
            Through Smart Health
          </span>
        </h1>

        <p className="text-md sm:text-xl text-[#242424] mb-8 mx-auto text-left">
          Cutting-Edge Care for African Women's Health
        </p>

        <ButtonComponent />
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
