"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import ButtonComponent from "./Button";

const healthConditions = [
  {
    text: "Menopause Care",
    color: "bg-[#D76441]",
    finalPos: { x: 180, y: 520 },
  },
  {
    text: "Endometriosis",
    color: "bg-[#FF9B33]",
    finalPos: { x: 420, y: 480 },
  },
  {
    text: "Mental Health",
    color: "bg-[#FFCE08]",
    finalPos: { x: 650, y: 520 },
  },
  {
    text: "Skin & Gut Concerns",
    color: "bg-[#7D5EFA]",
    finalPos: { x: 720, y: 420 },
  },
  {
    text: "Hormonal Disorders",
    color: "bg-[#FFCE08]",
    finalPos: { x: 1050, y: 480 },
  },
  {
    text: "Gynaecology",
    color: "bg-[#D76441]",
    finalPos: { x: 1280, y: 440 },
  },
  {
    text: "Fibroids",
    color: "bg-[#4BB543]",
    finalPos: { x: 140, y: 580 },
  },
  {
    text: "Sexual Health",
    color: "bg-[#01AC9C]",
    finalPos: { x: 480, y: 600 },
  },
  {
    text: "General Health",
    color: "bg-[#FF4671]",
    finalPos: { x: 750, y: 580 },
  },
  {
    text: "PCOS",
    color: "bg-[#3697FF]",
    finalPos: { x: 980, y: 540 },
  },
  {
    text: "Cervical Cancer Screening",
    color: "bg-[#FF9B33]",
    finalPos: { x: 900, y: 600 },
  },
];

export const Trust = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();
  const renderRef = useRef<Matter.Render>();
  const mouseConstraintRef = useRef<Matter.MouseConstraint>();
  const [isRaining, setIsRaining] = useState(true);
  const [tags, setTags] = useState<
    {
      body: Matter.Body;
      element: HTMLElement;
      data: (typeof healthConditions)[0];
      isDragging: boolean;
    }[]
  >([]);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldStartAnimation) {
            setShouldStartAnimation(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(sceneRef.current);

    return () => {
      observer.disconnect();
    };
  }, [shouldStartAnimation]);

  useEffect(() => {
    if (!sceneRef.current || !shouldStartAnimation) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint, Events } =
      Matter;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = 1;
    engine.world.gravity.scale = 0.001;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create renderer (invisible)
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        showVelocity: false,
        showAngleIndicator: false,
        showDebug: false,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const ground = Bodies.rectangle(width / 2, height - 25, width, 50, {
      isStatic: true,
      render: { fillStyle: "rgba(0, 0, 0, 0.1)", visible: false },
    });
    const leftWall = Bodies.rectangle(-10, height / 2, 20, height, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(width + 10, height / 2, 20, height, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(engine.world, [ground, leftWall, rightWall]);

    // Create mouse constraint for dragging
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.8,
        render: { visible: false },
      },
    });
    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    // Check if screen is small
    const isSmallScreen = width < 768;
    const cardWidth = isSmallScreen ? 120 : 160;
    const cardHeight = isSmallScreen ? 45 : 60;

    // Create physics bodies and DOM elements for each tag - ALL AT ONCE like rain
    const newTags = healthConditions.map((condition, index) => {
      // Random starting positions across the width
      const x = Math.random() * (width - cardWidth - 40) + cardWidth / 2 + 20;
      const y = -100 - Math.random() * 50; // Small random offset but all start high

      const body = Bodies.rectangle(x, y, cardWidth, cardHeight, {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.02,
        render: { visible: false },
      });

      const element = document.createElement("div");
      element.className = `absolute text-black rounded-full  font-semibold cursor-grab active:cursor-grabbing transform-gpu z-20 ${
        condition.color
      } ${
        isSmallScreen
          ? "px-8 py-3 text-xs min-w-[120px]"
          : "px-16 py-6 text-md min-w-[160px]"
      }`;
      element.textContent = condition.text;
      element.style.userSelect = "none";
      element.style.pointerEvents = "auto";
      element.style.position = "absolute";
      element.style.zIndex = "30";
      element.style.textAlign = "center";

      element.style.opacity = "0";
      element.style.transform = "translateY(-20px) scale(0.8)";

      setTimeout(() => {
        element.style.opacity = "1";
        element.style.animation = "fall 0.5s ease-out";
      }, index * 100); 

      let isDragging = false;

      element.addEventListener("mousedown", (e) => {
        isDragging = true;
        element.style.cursor = "grabbing";
        element.style.transform = "scale(1.05)";
        element.style.zIndex = "30";
        e.preventDefault();
      });

      element.addEventListener("mouseenter", () => {
        if (!isDragging) {
          element.style.transform = "scale(1.02)";
          element.style.filter = "drop-shadow(0 12px 24px rgba(0,0,0,0.4))";
        }
      });

      element.addEventListener("mouseleave", () => {
        if (!isDragging) {
          element.style.transform = "scale(1)";
          element.style.filter = "drop-shadow(0 8px 16px rgba(0,0,0,0.3))";
        }
      });

      document.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          element.style.cursor = "grab";
          element.style.transform = "scale(1)";
          element.style.zIndex = "20";
        }
      });

      sceneRef.current?.appendChild(element);
      World.add(engine.world, body);

      return { body, element, data: condition, isDragging: false };
    });

    setTags(newTags);

    // Update DOM elements to match physics bodies
    const updateElements = () => {
      newTags.forEach(({ body, element }) => {
        const pos = body.position;
        const angle = body.angle;
        const offsetX = isSmallScreen ? 60 : 80;
        const offsetY = isSmallScreen ? 22.5 : 30;

        element.style.transform = `translate(${pos.x - offsetX}px, ${
          pos.y - offsetY
        }px) rotate(${angle}rad)`;
        element.style.left = "0px";
        element.style.top = "0px";

        // Add settling effect when velocity is low
        if (
          Math.abs(body.velocity.y) < 0.1 &&
          Math.abs(body.velocity.x) < 0.1
        ) {
          element.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.2))";
        }
      });
    };

    // Check if rain has stopped
    const checkRainStopped = () => {
      const allSettled = newTags.every(
        ({ body }) =>
          Math.abs(body.velocity.y) < 0.1 && Math.abs(body.velocity.x) < 0.1
      );
      if (allSettled && isRaining) {
        setIsRaining(false);
      }
    };

    // Animation loop
    const animate = () => {
      Engine.update(engine);
      updateElements();
      checkRainStopped();
      requestAnimationFrame(animate);
    };

    // Start everything
    Render.run(render);
    animate();

    // Cleanup
    return () => {
      newTags.forEach(({ element }) => {
        element.remove();
      });
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (engineRef.current) {
        Engine.clear(engineRef.current);
      }
    };
  }, [shouldStartAnimation]);

  return (
    <section className="relative h-[100vh] overflow-hidden bg-[#F2E9DD] m-4 rounded-3xl ">
      {/* Rain effect overlay */}
      {isRaining && (
        <div className="absolute inset-0 pointer-events-none z-5">
          <div className="rain-overlay"></div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-10 pt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We focus on conditions that
            <br />
            impact African women
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-2xl mx-auto px-4">
            Whether you're managing pain, planning a family, or just not feeling
            like yourself, we are here to help.
          </p>
        <ButtonComponent/>
        </div>
      </div>
      {/* Physics Container */}
      <div
        ref={sceneRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ height: "100vh", zIndex: 15 }}
      />
      {/* Visual floor indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-200 to-transparent pointer-events-none z-10" />
      <style jsx>{`
        @keyframes fall {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(0.9);
          }
        }

        .rain-overlay {
          background: linear-gradient(
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          animation: rain-shimmer 2s ease-in-out infinite;
        }

        @keyframes rain-shimmer {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};
