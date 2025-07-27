"use client";

import { useEffect, useRef } from "react";
import ButtonComponent from "./Button";

export default function HeroSection() {
  const animatedWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const words = [
      "Empowering",
      "Supporting",
      "Uplifting",
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

      if (cursorRef.current) cursorRef.current.style.opacity = "1";

      await sleep(2000);
      await eraseWord();
    };

    const eraseWord = async () => {
      if (!animatedWordRef.current) return;

      const word = animatedWordRef.current.textContent || "";

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
    <section className="pt-32 sm:pt-44 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          {" "}
          <div className="text-4xl lg:text-6xl font-medium text-general-black mb-6 leading-normal inline-block ">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <span className="flex items-center text-yellow md:mr-2">
                <h1 ref={animatedWordRef as any}></h1>
                <span
                  ref={cursorRef}
                  className="ml-1 animate-blink md:leading-normal"
                >
                  |
                </span>
              </span>
              <h1>African Women</h1>
            </div>
            <h1 className="block">Through Smart Health</h1>
          </div>
        </div>

        <div className="text-center max-w-xl mx-auto">
          {" "}
          <h4 className="text-md sm:text-xl text-body-text-gray mb-8 font-bold">
            Cutting-Edge Care for African Women's Health
          </h4>
          <ButtonComponent />
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
