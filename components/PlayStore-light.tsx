"use client";

import React, { useState } from "react";

interface SvgHoverEffectProps {
  children: React.ReactNode; // your SVG inside
  hoverColor?: string;
}

const SvgHoverEffect: React.FC<SvgHoverEffectProps> = ({
  children,
  hoverColor = "#ff9b33",
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="relative inline-block overflow-hidden rounded-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        className="absolute rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          top: coords.y,
          left: coords.x,
          backgroundColor: hoverColor,
          width: isHovering ? "200%" : "0%",
          height: isHovering ? "200%" : "0%",
          transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0})`,
          borderRadius: "9999px",
          opacity: isHovering ? 0.2 : 0, // subtle overlay opacity
        }}
      ></span>

      <div className="relative">{children}</div>
    </div>
  );
};

export default SvgHoverEffect;
