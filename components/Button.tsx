import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface ButtonComponentProps {
  fullWidth?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  fullWidth = false,
}) => {
  return (
    <Button
      className={`bg-[#0D0D0DFC] text-sm text-general-white  rounded-full px-4 py-6 font-medium ${
        fullWidth ? "w-full" : ""
      }`}
    >
      <Image
        src="/images/Brand-Logo-Icon.png-light.png"
        alt="brand logo"
        className="w-4 h-4"
        width={12}
        height={12}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />{" "}
      Download App
    </Button>
  );
};

export default ButtonComponent;
