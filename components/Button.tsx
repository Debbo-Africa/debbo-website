import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ButtonComponentProps {
  fullWidth?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  fullWidth = false,
}) => {
  return (
    <Link href="/download">
      <Button
        className={`bg-[#0D0D0DFC] text-sm text-general-white  rounded-full px-4 py-6 font-medium ${
          fullWidth ? "w-full" : ""
        }`}
      >
        <Image
          src="/images/logo-light.svg"
          alt="brand logo"
          className="w-4 h-4"
          width={12}
          height={12}
        />{" "}
        Download App
      </Button>
    </Link>
  );
};

export default ButtonComponent;
