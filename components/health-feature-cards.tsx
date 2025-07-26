"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HealthFeatureCards() {
  const animatedWordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const words = ["Body.", "Rhythm.", "Care."];
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-light text-general-black mb-4">
          Your{" "}
          <h1
            className="text-yellow font-medium inline"
            ref={animatedWordRef as any}
          ></h1>
          <h1
            ref={cursorRef as any}
            className="ml-1 animate-blink md:leading-normal text-yellow inline"
          >
            |
          </h1>
        </h1>
        <p className="max-w-2xl mx-auto leading-relaxed">
          At DelibalAfrica, we understand that African women's health journeys
          are unique. That's why we created a mobile app that cares for your
          health needs, so you can live well and on your own terms.
        </p>
      </div>

      {/* Virtual Care Card */}
      <div className="mb-6 overflow-hidden rounded-3xl relative min-h-[400px] md:min-h-[500px] group">
        <div className="absolute inset-0">
          <Image
            src="/images/virtual-care.png"
            alt="Virtual care background"
            fill
            className="object-cover transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100"
          />
        </div>

        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="flex-1 text-white mb-8 md:mb-0 md:mr-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Access Virtual
              <br />
              Care with a Tap
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-md">
              Speak to doctors or specialists through secure video calls,
              wherever you are.
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-row gap-4 absolute bottom-8 left-8">
          <Image
            src="/images/playstore-small.svg"
            alt="Play Store"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
          <Image
            src="/images/appstore-small.svg"
            alt="App Store"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </div>
      </div>

      {/* Book Tests and Checkup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="overflow-hidden text-center rounded-3xl bg-yellow min-h-[440px] md:min-h-[480px] group">
          <div className="p-6 pb-0 h-full flex flex-col">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Book Tests in Minutes
            </h2>
            <p className="text-white/90 leading-relaxed flex-grow max-w-md mx-auto">
              Skip the queues. Schedule lab tests from anywhere—fast, easy, and
              reliable.
            </p>

            <div className="w-full h-[15rem] lg:h-96 relative mx-auto">
              <Image
                src="/images/book-test-mockup.png"
                alt="Book tests phone mockup"
                fill
                className="object-contain transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100 "
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-secondary-debbo1 text-center min-h-[480px] group">
          <div className="p-6 pb-0 h-full flex flex-col">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-4">
              Never Miss a Checkup
            </h2>
            <p className="text-white/90 leading-relaxed flex-grow max-w-md mx-auto">
              Set reminders to stay on top of your wellness checks and
              appointments, no more guesswork.
            </p>

            <div className="flex justify-center mt-4">
              <div className="w-full h-72 lg:h-[27rem] relative">
                <Image
                  src="/images/miss-cehckup-mockup.png"
                  alt="Checkup reminder phone mockup"
                  fill
                  className="object-contain transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden rounded-3xl relative min-h-[420px] md:min-h-[450px] group">
        <div className="absolute inset-0">
          <Image
            src="/images/old-woman-bg.png"
            alt="Track matters background"
            fill
            className="hidden md:block object-cover transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100"
          />
          <Image
            src="/images/old-woman-bg-small.png"
            alt="Track matters background"
            fill
            className="object-cover md:hidden transform transition-transform duration-300 ease-in-out scale-105 group-hover:scale-100"
          />
        </div>

        <div className="relative z-10 md:p-12 p-4 py-12 lg:px-12 pb-0 flex flex-col lg:flex-row lg:items-center">
          <div className="flex-1 text-center md:text-left text-white mb-8 lg:mb-0 lg:mr-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Track What Truly
              <br />
              Matters
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-xs lg:max-w-md">
              Our AI-powered triage tool assesses your symptoms and connects you
              to the care you need, when you need it.
            </p>
            <div className="flex justify-center md:justify-start mt-2 gap-1 mb-6 md:mb-24">
              <Image
                src="/images/icon-logo.svg"
                alt="Track matters phone mockup"
                className="object-contain w-6 h-6"
                width={10}
                height={10}
              />
              <p>Dr Déb</p>
            </div>

            <div className="flex flex-row gap-2">
              <Image
                src="/images/playstore-large.svg"
                alt="Play Store"
                width={140}
                height={45}
                className="h-auto w-auto"
              />
              <Image
                src="/images/appstore-large.svg"
                alt="App Store"
                width={140}
                height={45}
                className="h-auto w-auto"
              />
            </div>
          </div>

          <div className="flex-shrink-0 md:hidden lg:block">
            <div className="w-64 h-72 md:w-96 md:h-96 mx-auto relative md:absolute md:-bottom-[5%] md:left-1/2">
              <Image
                src="/images/iphone.png"
                alt="Track matters phone mockup"
                fill
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
