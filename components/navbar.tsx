"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ButtonComponent from "./Button";

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const aboutUsItems = [
    {
      label: "Who we are",
      href: "/about/who-we-are",
      image: "/images/about-who-we-are.jpg",
      description: "A modern healthcare company for African women.",
    },
    {
      label: "Our team",
      href: "/about/our-team",
      image: "/images/our-story.png",
      description: "Exceptional team of female healthcare professionals",
    },
    {
      label: "Careers",
      href: "/about/careers",
      image: "/images/career.jpg",
      description: "Join our mission to transform healthcare",
    },
    {
      label: "Debbo cares foundation",
      href: "/about/foundation",
      image: "/images/debbo-cares.jpg",
      description: "Debbo Africa foundation initiatives",
    },
  ];

  const resourcesItems = [
    {
      label: "News & Events",
      href: "/resources",
      image: "/images/resources-blog.jpg",
      description: "Stay up to date with our news and Events.",
    },
    {
      label: "Blog",
      href: "/resources/blog",
      image: "/images/nav-blog.jpg",
      description: "A range of topics to support your journey",
    },
    {
      label: "Glossary",
      href: "/resources/glossary",
      image: "/images/glossary.jpg",
      description: "Stay up to date with regular health tips",
    },
    {
      label: "FAQs",
      href: "/resources/faqs",
      image: "/images/faqs.jpg",
      description: "Frequently Asked Questions",
    },
  ];
  const individualItems = [
    {
      label: "Book a Test",
      href: "/individual",
      image: "/images/book-a-test.jpg",
      description: "Stay up to date with our news and Events.",
    },
    {
      label: "Book a Scan",
      href: "/individual/scan",
      image: "/images/book-a-scan.jpg",
      description:
        "Discover our expert radiology services for accurate & diagnosis",
    },
    {
      label: "Speak to a Doctor",
      href: "/individual/contact-a-doctor",
      image: "/images/speak-to-a-doctor.jpg",
      description: "Stay up to date with regular health tips",
    },
  ];

  const getDefaultImage = (dropdown: string) => {
    if (dropdown === "about") return aboutUsItems[0];
    if (dropdown === "resources") return resourcesItems[0];
    if (dropdown === "individual") return resourcesItems[0];
    return null;
  };

  const getCurrentImage = (dropdown: string) => {
    if (dropdown === "about") {
      const hoveredAboutItem = aboutUsItems.find(
        (item) => item.label === hoveredItem
      );
      return hoveredAboutItem || aboutUsItems[0];
    }
    if (dropdown === "resources") {
      const hoveredResourceItem = resourcesItems.find(
        (item) => item.label === hoveredItem
      );
      return hoveredResourceItem || resourcesItems[0];
    }
    if (dropdown === "individual") {
      const hoveredIndividuaItem = individualItems.find(
        (item) => item.label === hoveredItem
      );
      return hoveredIndividuaItem || individualItems[0];
    }
    return null;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFF5E9B2] rounded-b-3xl backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="DébboAfrica"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8  text-body-text-gray hover:text-general-black">
              <div className="relative group">
                <button className="flex items-center text-body-text-gray hover:text-general-black hover:bg-[--surface-card] rounded-2xl p-2 px-3 font-medium">
                  individual
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-badge -ml-[200px] rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="flex gap-4">
                    <div className="w-1/2 py-4 ml-4">
                      {individualItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-6 py-3 text-sm hover:text-general-black hover:bg-[--surface-card] hover:rounded-xl transition-colors ${
                            isActiveLink(item.href)
                              ? "text-general-black bg-[--surface-card] rounded-xl"
                              : "text-body-text-gray"
                          }`}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="w-1/2 p-4">
                      {(() => {
                        const currentImage = getCurrentImage("individual");
                        return currentImage ? (
                          <div className="relative h-64 rounded-2xl overflow-hidden">
                            <Image
                              src={currentImage.image || "/placeholder.svg"}
                              alt={currentImage.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                              <div className="p-4 text-white">
                                <h3 className="font-semibold text-lg opacity-90">
                                  {currentImage.description}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/corporate"
                className={`font-medium rounded-2xl p-2 px-3 hover:bg-[--surface-card] hover:text-general-black  ${
                  isActiveLink("/corporate")
                    ? "text-general-black bg-[--surface-card]  "
                    : "text-body-text-gray hover:text-general-black  "
                }`}
              >
                Corporate
              </Link>

              {/* About Us Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-body-text-gray hover:text-general-black hover:bg-[--surface-card] rounded-2xl px-3 p-2 font-medium">
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-badge -ml-[300px] rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="flex gap-4">
                    <div className="w-1/2 py-4 ml-4">
                      {aboutUsItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-6 py-3 text-sm hover:text-general-black rounded-2xl p-2  hover:bg-[--surface-card] transition-colors ${
                            isActiveLink(item.href)
                              ? "text-general-black bg-[--surface-card]  "
                              : "text-body-text-gray"
                          }`}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="w-1/2 p-4">
                      {(() => {
                        const currentImage = getCurrentImage("about");
                        return currentImage ? (
                          <div className="relative h-64 rounded-2xl overflow-hidden">
                            <Image
                              src={currentImage.image || "/placeholder.svg"}
                              alt={currentImage.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                              <div className="p-4 text-white">
                                <h3 className="font-semibold text-lg opacity-90">
                                  {currentImage.description}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center text-body-text-gray hover:text-gray-900 font-medium hover:bg-[--surface-card] px-3 p-2 rounded-2xl">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-badge -ml-[300px] rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="flex gap-4">
                    <div className="w-1/2 py-4 ml-4">
                      {resourcesItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-6 py-3 text-sm  hover:bg-[--surface-card] hover:text-general-black  hover:rounded-xl transition-colors ${
                            isActiveLink(item.href)
                              ? "text-general-black bg-[--surface-card] rounded-xl"
                              : "text-body-text-gray"
                          }`}
                          onMouseEnter={() => setHoveredItem(item.label)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="w-1/2 p-4">
                      {(() => {
                        const currentImage = getCurrentImage("resources");
                        return currentImage ? (
                          <div className="relative  h-64 rounded-lg overflow-hidden">
                            <Image
                              src={currentImage.image || "/placeholder.svg"}
                              alt={currentImage.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                              <div className="p-4 text-white">
                                <h3 className="font-semibold text-lg opacity-90">
                                  {currentImage.description}
                                </h3>
                              </div>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <ButtonComponent />
            </div>

            <Button
              size="icon"
              className="lg:hidden bg-transparent"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" color="#000" />
              ) : (
                <Menu className="h-6 w-6" color="#000" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-50 lg:hidden transition-transform duration-300 ease-in-out  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-badge min-h-screen ml-auto w-[22rem] shadow-xl rounded-l-3xl ">
          <div className="flex justify-end items-center p-4  hover:bg-transparent">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-16 w-16" />
            </Button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-80px)] px-4 py-8">
            <div className="space-y-8">
              <Link
                href="/"
                className={`block text-lg font-medium p-2 rounded-xl ${
                  isActiveLink("/")
                    ? "text-general-black bg-[--surface-card]"
                    : "text-body-text-gray"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div
                className={`rounded-xl p-4 hover:bg-[--surface-card] ${
                  pathname.startsWith("/about")
                    ? "bg-[--surface-card]"
                    : "bg-surface-card"
                }`}
              >
                <button
                  onClick={() => toggleDropdown("about")}
                  className="flex items-center justify-between w-full text-lg font-medium text-body-text-gray "
                >
                  About us
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "about" && (
                  <div className="mt-6 space-y-3 ">
                    <div className="lg:block hidden mb-4">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={getDefaultImage("about")?.image || ""}
                          alt="About us"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className=" space-y-8">
                      {aboutUsItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block text-base p-2 rounded-xl  ${
                            isActiveLink(item.href)
                              ? "text-general-black bg-[--surface-card]"
                              : "text-body-text-gray"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`rounded-xl p-4 ${
                  pathname.startsWith("/individual")
                    ? "text-general-black bg-[--surface-card]"
                    : "bg-surface-card"
                }`}
              >
                <button
                  onClick={() => toggleDropdown("individual")}
                  className="flex items-center justify-between w-full text-lg font-medium text-body-text-gray"
                >
                  For Individuals
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === "individual" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "individual" && (
                  <div className="mt-8 space-y-8">
                    <div className="lg:block hidden mb-4">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={getDefaultImage("individual")?.image || ""}
                          alt="For Individuals"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="space-y-8">
                      {individualItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block text-base p-2 rounded-xl ${
                            isActiveLink(item.href)
                              ? "text-general-black bg-[--surface-card]"
                              : "text-body-text-gray"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/corporate"
                className={`block text-lg font-medium p-2 rounded-xl ${
                  isActiveLink("/corporate")
                    ? "text-general-black bg-[--surface-card]"
                    : "text-body-text-gray"
                }`}
                onClick={() => setIsOpen(false)}
              >
                For Corporate
              </Link>

              <div
                className={`rounded-xl p-4 ${
                  pathname.startsWith("/resources")
                    ? "text-general-black bg-[--surface-card]"
                    : "bg-surface-card"
                }`}
              >
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="flex items-center justify-between w-full text-lg font-medium text-body-text-gray"
                >
                  Resources
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown === "resources" && (
                  <div className="mt-8 space-y-8">
                    <div className="lg:block hidden mb-4">
                      <div className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={getDefaultImage("resources")?.image || ""}
                          alt="Resources"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className=" space-y-8">
                      {resourcesItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block text-base p-2 rounded-xl ${
                            isActiveLink(item.href)
                              ? "text-general-black bg-[--surface-card]"
                              : "text-body-text-gray"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Download App Button */}
              <div className="pt-6">
                <ButtonComponent fullWidth />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
