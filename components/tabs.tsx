"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultActiveKey?: string;
}

export function Tabs({ tabs, defaultActiveKey }: TabsProps) {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || (tabs.length > 0 ? tabs[0].key : "")
  );

  const activeTab = tabs.find((tab) => tab.key === activeKey);

  return (
    <div className="w-full">
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant="ghost"
              className={`px-6 py-4 rounded-none bg-transparent border-b-2 transition-colors ${
                activeKey === tab.key
                  ? "border-yellow text-general-black bg-transparent hover:bg-transparent"
                  : "border-transparent text-gray-text hover:text-general-black hover:bg-transparent"
              }`}
              onClick={() => setActiveKey(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full pt-8">{activeTab?.content}</div>
    </div>
  );
}
