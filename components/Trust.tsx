"use client";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import ButtonComponent from "./Button";

const healthConditions = [
  {
    text: "Menopause Care",
    color: "bg-[--color-secondary-debbo2]",
    finalPos: { x: 180, y: 520 },
  },
  {
    text: "Endometriosis",
    color: "bg-[--color-secondary-debbo3]",
    finalPos: { x: 420, y: 480 },
  },
  {
    text: "Mental Health",
    color: "bg-[--color-secondary-debbo4]",
    finalPos: { x: 650, y: 520 },
  },
  {
    text: "Skin & Gut Concerns",
    color: "bg-[--color-secondary-debbo9]",
    finalPos: { x: 720, y: 420 },
  },
  {
    text: "Hormonal Disorders",
    color: "bg-[--color-secondary-debbo4]",
    finalPos: { x: 1050, y: 480 },
  },
  {
    text: "Gynaecology",
    color: "bg-[--color-secondary-debbo5]",
    finalPos: { x: 1280, y: 440 },
  },
  {
    text: "Fibroids",
    color: "bg-[--color-secondary-debbo9]",
    finalPos: { x: 140, y: 580 },
  },
  {
    text: "Sexual Health",
    color: "bg-[--color-secondary-debbo6]",
    finalPos: { x: 480, y: 600 },
  },
  {
    text: "General Health",
    color: "bg-[--color-secondary-debbo10]",
    finalPos: { x: 750, y: 580 },
  },
  {
    text: "PCOS",
    color: "bg-[--color-secondary-debbo6]",
    finalPos: { x: 980, y: 540 },
  },
  {
    text: "Cervical Cancer",
    color: "bg-[--color-secondary-debbo3]",
    finalPos: { x: 900, y: 600 },
  },
];

interface Tag {
  body: Matter.Body;
  element: HTMLElement;
  data: (typeof healthConditions)[0];
  isDragging: boolean;
}

export const Trust = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const [isRaining, setIsRaining] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);

  // Intersection Observer for animation trigger
  useEffect(() => {
    if (!sceneRef.current || shouldStartAnimation) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

    return () => observer.disconnect();
  }, [shouldStartAnimation]);

  // Main physics and animation setup
  useEffect(() => {
    if (!sceneRef.current || !shouldStartAnimation) return;

    const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;
    const isSmallScreen = width < 768;

    // Create physics engine
    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = 1;
    engine.world.gravity.scale = 0.001;

    // Create renderer
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
    const boundaries = [
      Bodies.rectangle(width / 2, height - 25, width, 50, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(-10, height / 2, 20, height, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(width + 10, height / 2, 20, height, {
        isStatic: true,
        render: { visible: false },
      }),
    ];
    World.add(engine.world, boundaries);

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

    // Card dimensions based on screen size
    const cardWidth = isSmallScreen ? 120 : 180;
    const cardHeight = isSmallScreen ? 45 : 70;

    // Create physics tags
    const newTags = createPhysicsTags(
      healthConditions,
      width,
      cardWidth,
      cardHeight,
      isSmallScreen
    );
    setTags(newTags);

    // Animation loop
    const animate = () => {
      Engine.update(engine);
      updateTagPositions(newTags, isSmallScreen);
      checkIfRainStopped(newTags);
      requestAnimationFrame(animate);
    };

    Render.run(render);
    animate();

    // Cleanup
    return () => {
      newTags.forEach(({ element }) => element.remove());
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
      }
      if (engineRef.current) {
        Engine.clear(engineRef.current);
      }
    };
  }, [shouldStartAnimation]);

  const createPhysicsTags = (
    conditions: typeof healthConditions,
    width: number,
    cardWidth: number,
    cardHeight: number,
    isSmallScreen: boolean
  ): Tag[] => {
    const { Bodies, World } = Matter;
    return conditions.map((condition, index) => {
      // Calculate initial positions
      const spacing = cardWidth + 30;
      const x = ((index * spacing) % (width - spacing)) + spacing;
      const y = -150 - Math.random() * 100;

      // Create physics body
      const body = Bodies.rectangle(x, y, cardWidth, cardHeight, {
        restitution: 0.7,
        friction: 0.2,
        frictionAir: 0.02,
        slop: 0.1,
        render: { visible: false },
      });

      // Create DOM element
      const element = createTagElement(condition, isSmallScreen, index);
      sceneRef.current?.appendChild(element);
      World.add(engineRef.current!.world, body);

      return { body, element, data: condition, isDragging: false };
    });
  };

  const createTagElement = (
    condition: (typeof healthConditions)[0],
    isSmallScreen: boolean,
    index: number
  ): HTMLElement => {
    const element = document.createElement("div");
    const baseClasses =
      "absolute text-black rounded-full font-semibold cursor-grab active:cursor-grabbing transform-gpu";
    const sizeClasses = isSmallScreen
      ? "px-6 py-3 text-xs min-w-[120px]"
      : "px-10 py-5 text-2xl min-w-[180px]"; // Increased text size and padding
    element.className = `${baseClasses} ${condition.color} ${sizeClasses}`;
    element.textContent = condition.text;

    // Initial styles
    Object.assign(element.style, {
      userSelect: "none",
      pointerEvents: "auto",
      position: "absolute",
      zIndex: "10", // Pills z-index
      textAlign: "center",
      opacity: "0",
      transform: "translateY(-20px) scale(0.8)",
    });

    // Staggered animation entrance
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.animation = "fall 0.5s ease-out";
    }, index * 80);

    setupTagInteractions(element);
    return element;
  };

  const setupTagInteractions = (element: HTMLElement) => {
    let isDragging = false;
    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      element.style.cursor = "grabbing";
      element.style.transform = "scale(1.05)";
      element.style.zIndex = "15"; // z-index when dragging
      e.preventDefault();
    });
    element.addEventListener("mouseenter", () => {
      if (!isDragging) {
        element.style.transform = "scale(1.02)";
      }
    });
    element.addEventListener("mouseleave", () => {
      if (!isDragging) {
        element.style.transform = "scale(1)";
      }
    });
    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        element.style.cursor = "grab";
        element.style.transform = "scale(1)";
        element.style.zIndex = "10"; // Reset z-index after dragging
      }
    });
  };

  const updateTagPositions = (tags: Tag[], isSmallScreen: boolean) => {
    const offsetX = isSmallScreen ? 60 : 90; // Adjusted for larger cards
    const offsetY = isSmallScreen ? 22.5 : 35; // Adjusted for larger cards
    tags.forEach(({ body, element }) => {
      const { x, y } = body.position;
      const angle = body.angle;
      element.style.transform = `translate(${x - offsetX}px, ${
        y - offsetY
      }px) rotate(${angle}rad)`;
      element.style.left = "0px";
      element.style.top = "0px";
    });
  };

  const checkIfRainStopped = (tags: Tag[]) => {
    const allSettled = tags.every(
      ({ body }) =>
        Math.abs(body.velocity.y) < 0.1 && Math.abs(body.velocity.x) < 0.1
    );
    if (allSettled && isRaining) {
      setIsRaining(false);
    }
  };

  return (
    <section className="relative h-[93vh] overflow-hidden rounded-3xl bg-[--surface-card]">
      <div
        ref={sceneRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ height: "100vh", zIndex: 1 }}
      />

      {isRaining && (
        <div className="absolute inset-0 pointer-events-none z-2">
          <div className="rain-overlay"></div>
        </div>
      )}


      <div className="max-w-6xl mx-auto px-4 sm:px-8 relative z-20 pt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-general-black mb-6">
            We focus on conditions that
            <br />
            significantly impact African women
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-body-text-gray mb-8 max-w-2xl mx-auto px-4">
            Whether you're managing pain, planning a family, or just not feeling
            like yourself, we are here to help.
          </p>
          <ButtonComponent />
        </div>
      </div>

      
    </section>
  );
};
