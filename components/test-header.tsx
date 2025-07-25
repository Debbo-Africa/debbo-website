"use client";
import { CartIcon } from "@/components/cart-icon";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TestHeaderProps {
  showTabs?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = [
  {
    key: "women",
    label: "Women's Health",
    icon: "/images/woman-head.svg",
  },
  {
    key: "sexual",
    label: "Sexual Health",
    icon: "/images/gynecology.svg",
  },
  {
    key: "general",
    label: "General Health",
    icon: "/images/general-health.svg",
  },
  {
    key: "occupational",
    label: "Occupational Health",
    icon: "/images/briefcase.svg",
  },
];

export function TestHeader({
  showTabs = false,
  activeTab,
  onTabChange,
}: TestHeaderProps) {
  const activeTabData = tabs.find((tab) => tab.key === activeTab);

  return (
    <header className="bg-[--surface-card] fixed top-16 w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-8">
            {showTabs && (
              <>
                {/* Desktop Tabs */}
                <nav className="hidden md:flex space-x-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => onTabChange?.(tab.key)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === tab.key
                          ? "bg-[#D9D0C6] text-general-black"
                          : "text-general-black hover:bg-[--surface-card]"
                      }`}
                    >
                      <img
                        src={tab.icon || "/placeholder.svg"}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Mobile Dropdown */}
                <div className="md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild className="hover:bg-[#D9D0C6]">
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-2"
                      >
                        {activeTabData && (
                          <>
                            <img
                              src={activeTabData.icon || "/placeholder.svg"}
                              alt=""
                              className="w-4 h-4"
                            />
                            <span>{activeTabData.label}</span>
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-56 bg-[#D9D0C6]"
                    >
                      {tabs.map((tab) => (
                        <DropdownMenuItem
                          key={tab.key}
                          onClick={() => onTabChange?.(tab.key)}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src={tab.icon || "/placeholder.svg"}
                            alt=""
                            className="w-5 h-5"
                          />
                          <span>{tab.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>

          <CartIcon />
        </div>
      </div>
    </header>
  );
}
