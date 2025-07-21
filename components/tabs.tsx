import React from "react";

interface Tab {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string| any;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>|any;
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
      <div className="flex justify-center gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 ${
              activeTab === tab.key
                ? "border-b-2 border-yellow font-semibold"
                : "text-body-text-gray"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tabs.find((tab) => tab.key === activeTab)?.content}
      </div>
    </div>
  );
}
