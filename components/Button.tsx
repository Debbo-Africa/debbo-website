"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

interface ButtonComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  text?: React.ReactNode;
  linkTo?: string;
  arrow?: boolean;
  hoverColor?: string; // ✅ hover radial color
  defaultColor?: string; // ✅ base button background
  icon?: React.ReactNode; // ✅ custom icon on right
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  fullWidth = false,
  text,
  linkTo = "/download",
  arrow = true,
  hoverColor = "#ff9b33",
  defaultColor = "#0D0D0DFC",
  icon,
  className,
  type = "button",
  disabled,
  ...rest
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

  const buttonElement = (
    <Button
      type={type}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-pointer text-sm text-general-white rounded-full px-4 py-6 font-extrabold ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{ backgroundColor: defaultColor }} // ✅ set base bg
      {...rest}
    >
      <span
        className="absolute rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          top: coords.y,
          left: coords.x,
          backgroundColor: hoverColor, // ✅ use hover color prop
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
            {icon}
            {arrow && <MoveRight size={16} />}
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
  );

  return linkTo ? <Link href={linkTo}>{buttonElement}</Link> : buttonElement;
};

export default ButtonComponent;
