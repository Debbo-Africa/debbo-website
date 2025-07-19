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
    icon: "/placeholder.svg?height=20&width=20",
  },
  {
    key: "sexual",
    label: "Sexual Health",
    icon: "/placeholder.svg?height=20&width=20",
  },
  {
    key: "general",
    label: "General Health",
    icon: "/placeholder.svg?height=20&width=20",
  },
  {
    key: "occupational",
    label: "Occupational Health",
    icon: "/placeholder.svg?height=20&width=20",
  },
];

export function TestHeader({
  showTabs = false,
  activeTab,
  onTabChange,
}: TestHeaderProps) {
  const activeTabData = tabs.find((tab) => tab.key === activeTab);

  return (
    <header className="bg-[--surface-card] ">
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
                      className="w-56 bg-[#D9D0C6] hover:bg-[#D9D0C6]"
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
