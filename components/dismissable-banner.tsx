"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DismissibleBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed top-0 left-0 w-full z-[150] bg-[--surface-card] p-2">
      <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2">
          <div className="w-5 h-5 text-secondary-debbo1 flex-shrink-0 flex items-center">
            <Image
              src="/images/banner-logo.svg"
              alt="banner"
              width={16}
              height={16}
            />
          </div>
          <span className="font-medium text-xs md:text-sm text-body-text-gray break-words">
            Join the waitlist for early access to the MyDébbo app
          </span>
          <Button
            variant="link"
            className="text-general-black underline p-0 h-auto font-medium"
            onClick={() =>
              window.open("https://forms.gle/4iEDeUCFzdPTL3J19", "_blank")
            }
          >
            Join Now
          </Button>
        </div>

        <div className="absolute right-2 top-2 sm:static sm:translate-y-0 sm:right-0">
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
