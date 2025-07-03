"use client"
import { useEffect, useRef, useState } from "react";

export default function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      return large;
    };

    // Initial check
    const large = checkScreenSize();

    const handleResize = () => {
      checkScreenSize();
    };

    window.addEventListener("resize", handleResize);

    // Set ready after initial screen size check
    setTimeout(() => setIsReady(true), 100);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isReady || isLargeScreen === null || !isLargeScreen) return;

    let scrollTriggerInstance: any = null;

    const loadGsap = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const { gsap } = gsapModule;
        const { ScrollTrigger } = scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);

        // Wait for next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollTriggerInstance = runAnimation(gsap, ScrollTrigger);
          });
        });
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    loadGsap();

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance();
      }
    };
  }, [isReady, isLargeScreen]);

  const runAnimation = (gsap: any, ScrollTrigger: any) => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) {
      console.log("Elements not found for animation");
      return;
    }

    // Clear any existing ScrollTriggers on this element
    ScrollTrigger.getAll().forEach((trigger: any) => {
      if (trigger.trigger === section) {
        trigger.kill();
      }
    });

    const cardWidth = 450;
    const gap = 16;
    const padding = 64;
    const numCards = 4;

    // Calculate scroll distance more reliably
    const totalContentWidth =
      cardWidth * numCards + gap * (numCards - 1) + padding * 2;
    const viewportWidth = window.innerWidth;
    const scrollDistance = Math.max(totalContentWidth - viewportWidth, 100);

    console.log("Animation setup:", {
      totalContentWidth,
      viewportWidth,
      scrollDistance,
      sectionHeight: section.offsetHeight,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 20%",
        end: `+=${scrollDistance * 2}`, // Increased end distance for smoother scrolling
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
        refreshPriority: -1, // Lower priority for refresh
        onUpdate: (self : any ) => {
          console.log("ScrollTrigger progress:", self.progress as any);
        },
        onToggle: (self: any) => {
          console.log("ScrollTrigger toggle:", self.isActive);
        },
      },
    });

    tl.to(container, {
      x: -scrollDistance,
      ease: "none",
    });

    // Improved resize handler
    const handleResize = () => {
      console.log("Resize triggered, refreshing ScrollTrigger");
      // Debounce the refresh
      clearTimeout(handleResize.timeout);
      handleResize.timeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener("resize", handleResize);

    // Return cleanup function
    return () => {
      console.log("Cleaning up ScrollTrigger");
      window.removeEventListener("resize", handleResize);
      clearTimeout(handleResize.timeout);
      ScrollTrigger.getAll().forEach((trigger: any) => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  };

  // Card data
const cards = [
  {
    id: 1,
    title: "Triage",
    description:
      "Our AI-powered tool helps guide you to the right care quickly and safely.",
    image: "/images/triage-phone.png",
    alt: "Triage phone interface",
    bgClass: "",
  },
  {
    id: 2,
    title: "Consult",
    description: "Speak with licensed doctors virtually or in person.",
    image: "/images/consult-phone.png",
    alt: "Consult phone interface",
    bgClass: "",
  },
  {
    id: 3,
    title: "Act",
    description:
      "Need a lab test or scan? We come to you, or you can visit our trusted facilities. All tests are reviewed by trusted clinical experts.",
    image: "/images/act-microscope.png",
    alt: "Medical microscope",
    bgClass: "bg-gradient-to-br from-gray-800 to-gray-900",
  },
  {
    id: 4,
    title: "Support",
    description:
      "Care doesn't end with a test. Track results, access health reminders, join community forums, and learn from personalised content in the app.",
    image: "/images/doctor.png",
    alt: "Doctor providing care",
    bgClass: "bg-gradient-to-br from-teal-500 to-teal-600",
  },
];

  const renderCard = (card: any) => (
    <div
      key={card.id}
      className={`
        ${
          isLargeScreen
            ? "flex-shrink-0 w-[450px] h-[540px]"
            : "w-full h-[580px] md:h-[450px]"
        } 
        rounded-3xl relative overflow-hidden ${card.bgClass}
        ${!isLargeScreen ? "mb-4" : ""}
      `}
    >
      <img
        src={card.image}
        alt={card.alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
          {card.title}
        </h3>
        <p
          className={`text-base leading-relaxed opacity-90 ${
            isLargeScreen
              ? "md:text-lg max-w-[280px] md:max-w-[340px]"
              : "max-w-[280px] sm:max-w-[400px]"
          }`}
        >
          {card.description}
        </p>
      </div>
    </div>
  );

  // Don't render anything until we know the screen size
  if (isLargeScreen === null || !isReady) {
    return (
      <div className="h-[540px] flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
          Discover the seamless process behind our approach.
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Every woman's health story is different. We're here to support your
          journey through our free AI-powered mobile app — a digital health
          companion thoughtfully guided by doctors who care.
        </p>
      </div>

      {isLargeScreen ? (
        <div ref={sectionRef} className="relative overflow-hidden h-[540px]">
          <div
            ref={containerRef}
            className="flex gap-4 px-16"
            style={{ width: "fit-content" }}
          >
            {cards.map((card) => renderCard(card))}
          </div>
        </div>
      ) : (
        <div className="px-4 md:px-8 pb-16">
          <div className="max-w-2xl mx-auto">
            {cards.map((card) => renderCard(card))}
          </div>
        </div>
      )}
    </div>
  );
}


