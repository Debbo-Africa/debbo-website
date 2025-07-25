"use client";
import type React from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
  infoContent?: string; // Added optional infoContent
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string | any;
  setActiveTab: React.Dispatch<React.SetStateAction<string>> | any;
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  className = "",
}: TabsProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="overflow-x-auto">
        <div
          className={`flex justify-start gap-4 border-b border-[#F2E9DD] w-max min-w-full ${className}`}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group py-2 px-4 whitespace-nowrap flex items-center gap-1 ${
                activeTab === tab.key
                  ? "border-b-2 border-yellow font-semibold"
                  : "text-body-text-gray"
              }`}
            >
              {tab.label}
              {tab.infoContent && (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-body-text-gray font-light cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="w-auto max-w-[15rem] font-light  text-sm p-4 bg-badge shadow-md rounded-lg whitespace-normal break-words"
                    >
                      {tab.infoContent}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-8">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
}
