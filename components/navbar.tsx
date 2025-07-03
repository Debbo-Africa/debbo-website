"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ButtonComponent from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const aboutUsItems = [
    { label: "Who we are", href: "#" },
    { label: "Our team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Debbo cares foundation", href: "#" },
  ];

  const resourcesItems = [
    { label: "Blog", href: "#" },
    { label: "Health Library", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Support", href: "#" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF5E9B2] rounded-b-3xl backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="DébboAfrica"
                width={150}
                height={40}
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Individual
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Corporate
              </a>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {aboutUsItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {resourcesItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <ButtonComponent />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-[#FFF5E9] min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <Image
              src="/images/logo.png"
              alt="DébboAfrica"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Scrollable Menu Content */}
          <div className="overflow-y-auto h-[calc(100vh-80px)] px-4 py-6">
            <div className="space-y-6">
              {/* Home */}
              <a
                href="#"
                className="block text-lg font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>

              {/* About Us Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown("about")}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-700"
                >
                  About us
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "about" && (
                  <div className="mt-3 ml-4 space-y-3">
                    {aboutUsItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block text-base text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* For Individuals */}
              <a
                href="#"
                className="block text-lg font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                For Individuals
              </a>

              {/* For Corporate */}
              <a
                href="#"
                className="block text-lg font-medium text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                For Corporate
              </a>

              {/* Resources Dropdown */}
              <div>
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="flex items-center justify-between w-full text-lg font-medium text-gray-700"
                >
                  Resources
                  <ChevronRight
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === "resources" ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {openDropdown === "resources" && (
                  <div className="mt-3 ml-4 space-y-3">
                    {resourcesItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block text-base text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Download App Button */}
              <div className="pt-6">
                <ButtonComponent fullWidth/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
