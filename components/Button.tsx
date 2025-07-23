"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronRight, MoveRight } from "lucide-react"; 

interface ButtonComponentProps {
  fullWidth?: boolean;
  text?: string;
  className?:string
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  fullWidth = false,
  text,
  className
}) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
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
    <Link href="/download">
      <Button
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden ${className} cursor-pointer bg-[#0D0D0DFC] text-sm text-general-white rounded-full px-4 py-6 font-medium ${
          fullWidth ? "w-full" : ""
        }`}
      >
        <span
          className="absolute rounded-full bg-yellow pointer-events-none transition-transform duration-500 ease-out"
          style={{
            top: coords.y,
            left: coords.x,
            width: isHovering ? "200%" : "0%",
            height: isHovering ? "200%" : "0%",
            transform: `translate(-50%, -50%) scale(${isHovering ? 1 : 0})`,
            borderRadius: "9999px",
            opacity: isHovering ? 1 : 0,
          }}
        ></span>

        <span className="relative flex items-center gap-2">
          {text ? (
            <>
              <span>{text}</span>
              <MoveRight size={16} />
            </>
          ) : (
            <>
              <Image
                src="/images/logo-light.svg"
                alt="brand logo"
                className="w-4 h-4"
                width={12}
                height={12}
              />
              Download App
            </>
          )}
        </span>
      </Button>
    </Link>
  );
};

export default ButtonComponent;
