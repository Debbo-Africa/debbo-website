"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DismissibleBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed top-0 left-0 w-full z-[150] bg-[--surface-card] p-2 ">
      <div className="relative max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-sm flex items-center justify-center">
          <div className="w-5 h-5 mr-2 text-secondary-debbo1 flex items-center">
            <Image
              src="/images/banner-logo.svg"
              alt="banner"
              width={16}
              height={16}
            />
          </div>
          <span className="font-medium text-xs md:text-sm text-body-text-gray">
            Enrol for our society event
          </span>
          <Button
            variant="link"
            className="text-general-black underline p-0 ml-2 h-auto font-medium"
            onClick={() => window.open("#", "_blank")}
          >
            Enroll now
          </Button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-general-black hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
