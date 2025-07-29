"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ButtonComponent from "./Button";
import { DismissibleBanner } from "./dismissable-banner";
import { useBanner } from "@/hooks/use-banner";

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Use Zustand store instead of local state
  const { bannerVisible, closeBanner } = useBanner();

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const aboutUsItems = [
    {
      label: "Who We Are",
      href: "/about/who-we-are",
      image: "/images/about-who-we-are.jpg",
      description: "A modern healthcare company for African women.",
    },
    {
      label: "Our Team",
      href: "/about/our-team",
      image: "/images/our-story.jpeg",
      description: "Meet our team of exceptional female health professionals",
    },
    {
      label: "Careers",
      href: "/about/careers",
      image: "/images/career.jpg",
      description: "Join our mission to transform women's health",
    },
    {
      label: "Débbo Cares Foundation",
      href: "/about/foundation",
      image: "/images/debbo-cares.jpg",
      description: "Débbo Africa Foundation Initiatives",
    },
  ];

  const resourcesItems = [
    {
      label: "News & Events",
      href: "/resources/news-and-event",
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
      label: "Speak to a Doctor",
      href: "/individual/contact-a-doctor",
      image: "/images/speak-to-a-doctor.jpg",
      description:
        "Access health care anytime, anywhere through virtual consultations",
    },
    {
      label: "Book a Test",
      href: "/individual/book-a-test",
      image: "/images/book-a-test.jpg",
      description:
        "Lab tests at home or in person, with results you can trust.",
    },
    {
      label: "Book a Scan",
      href: "/individual/scan",
      image: "/images/book-a-scan.jpg",
      description:
        "Discover our expert radiology services for accurate imaging and timely diagnosis.",
    },
  ];

  useEffect(() => {
    const preloadImages = async () => {
      const allImages = [
        ...aboutUsItems.map((item) => item.image),
        ...resourcesItems.map((item) => item.image),
        ...individualItems.map((item) => item.image),
      ];

      const imagePromises = allImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDefaultImage = (dropdown: string) => {
    if (dropdown === "about") return aboutUsItems[0];
    if (dropdown === "resources") return resourcesItems[0];
    if (dropdown === "individual") return individualItems[0];
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
      {bannerVisible && <DismissibleBanner onClose={closeBanner} />}

      <nav
        className={`fixed left-0 right-0 z-[100] transition-colors duration-300 mb-40 ${
          bannerVisible ? "top-[32px] mb-64" : "top-0"
        } ${isScrolled ? "bg-[#FFF5E9F7]" : "bg-[#fff5e9"} ${
          !pathname.includes("individual") && !pathname.includes("cart")
            ? "rounded-b-3xl"
            : ""
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="DébboAfrica"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-8 text-general-black hover:text-general-black">
              <div className="relative group">
                <button
                  className={`flex items-center z-50 text-general-black font-medium rounded-full px-3 p-2 hover:bg-[--surface-card] transition-colors ${
                    isActiveLink("/individual") ? " bg-[--surface-card]" : ""
                  }`}
                >
                  For Individuals
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-badge -ml-[200px] z-[999] rounded-3xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="flex gap-4">
                    <div className="w-1/2 py-4 ml-4">
                      {individualItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-6 py-3 text-general-black text-sm hover:text-general-black hover:bg-[--surface-card] hover:rounded-full transition-colors ${
                            isActiveLink(item.href)
                              ? " bg-[--surface-card] rounded-full"
                              : ""
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
                          <div className="relative h-64 rounded-3xl overflow-hidden">
                            <Image
                              src={currentImage.image || "/placeholder.svg"}
                              alt={currentImage.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-end">
                              <div className="p-4 text-white">
                                <p className="font-semibold text-md opacity-90">
                                  {currentImage.description}
                                </p>
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
                className={`font-medium rounded-full text-general-black p-2 px-3 hover:bg-[--surface-card] hover:text-general-black font-recoleta ${
                  isActiveLink("/corporate") ? "bg-[--surface-card]" : ""
                }`}
              >
                For Corporate
              </Link>

              <div className="relative group">
                <button
                  className={`flex items-center font-medium text-general-black rounded-full px-3 p-2 hover:bg-[--surface-card] transition-colors ${
                    isActiveLink("/about") ? " bg-[--surface-card]" : ""
                  }`}
                >
                  About Us
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-badge -ml-[300px] rounded-3xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999]">
                  <div className="flex gap-4">
                    <div className="w-1/2 py-4 ml-4">
                      {aboutUsItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-6 py-3 text-general-black text-sm hover:text-general-black rounded-full p-2 hover:bg-[--surface-card] transition-colors ${
                            isActiveLink(item.href)
                              ? " bg-[--surface-card]"
                              : ""
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
                          <div className="relative h-64 rounded-3xl overflow-hidden">
                            <Image
                              src={currentImage.image || "/placeholder.svg"}
                              alt={currentImage.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-end">
                              <div className="p-4 text-white">
                                <p className="font-semibold text-md">
                                  {currentImage.description}
                                </p>
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
                <button
                  className={`flex items-center text-general-black font-medium rounded-3xl px-3 p-2 hover:bg-[--surface-card] transition-colors cursor-none ${
                    isActiveLink("/resources") ? " bg-[--surface-card]" : ""
                  }`}
                >
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-badge -ml-[300px] rounded-3xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999]">
                  <div className="flex gap-4">
                    <div className="w-1/2 py-4 ml-4">
                      {resourcesItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block px-6 py-3 text-sm hover:bg-[--surface-card] text-general-black hover:rounded-full transition-colors  ${
                            isActiveLink(item.href)
                              ? " bg-[--surface-card] rounded-full"
                              : ""
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
                          <div className="relative h-64 rounded-3xl overflow-hidden">
                            <Image
                              src={currentImage.image || "/placeholder.svg"}
                              alt={currentImage.label}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-end">
                              <div className="p-4 text-white">
                                <p className="font-semibold text-md opacity-90">
                                  {currentImage.description}
                                </p>
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

            <div className="hidden lg:block cursor-none">
              <ButtonComponent />
            </div>

            <Button
              className="lg:hidden bg-transparent hover:bg-transparent w-8 h-8 p-0 flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X style={{ width: "2rem", height: "2rem" }} color="#000" />
              ) : (
                <Menu style={{ width: "2rem", height: "2rem" }} color="#000" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[11333330] lg:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-badge min-h-screen ml-auto w-[22rem] shadow-xl rounded-l-3xl">
          <div className="flex justify-end items-center p-4 hover:bg-transparent">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="hover:bg-transparent"
            >
              <X
                className="w-8 h-8"
                style={{ width: "2rem", height: "2rem" }}
              />
            </Button>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-80px)] px-4 py-8 ">
            <div className="space-y-8">
              <Link
                href="/"
                className={`block text-lg font-medium p-2 py-4 ml-2 rounded-full text-general-black ${
                  isActiveLink("/") ? "bg-[--surface-card] px-4 ml-0" : ""
                }`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              {/* For Individuals */}
              <div
                className={`rounded-3xl p-4 ${
                  pathname.startsWith("/individual")
                    ? "bg-[--surface-card]"
                    : "bg-surface-card"
                }`}
              >
                <button
                  onClick={() => toggleDropdown("individual")}
                  className="flex items-center justify-between w-full text-lg font-medium text-general-black"
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
                      <div className="relative h-32 rounded-lg overflow-hidden bg-black bg-opacity-30">
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
                          className={`block text-base p-2 rounded-xl text-general-black ${
                            isActiveLink(item.href) ? "bg-[--surface-card]" : ""
                          }`}
                          onClick={closeMobileMenu}
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
                className={`block text-lg font-medium ml-2 p-2 py-4 rounded-full  text-general-black ${
                  isActiveLink("/corporate")
                    ? "bg-[--surface-card] px-4 ml-0"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                For Corporate
              </Link>
              <div
                className={`rounded-3xl p-4 ${
                  pathname.startsWith("/about")
                    ? "bg-[--surface-card]"
                    : "bg-surface-card"
                }`}
              >
                <button
                  onClick={() => toggleDropdown("about")}
                  className="flex items-center justify-between w-full text-lg font-medium text-general-black"
                >
                  About us
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      openDropdown === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "about" && (
                  <div className="mt-6 space-y-3">
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
                    <div className="space-y-8">
                      {aboutUsItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block text-base p-2 rounded-xl text-general-black ${
                            isActiveLink(item.href) ? "bg-[--surface-card]" : ""
                          }`}
                          onClick={closeMobileMenu}
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
                  pathname.startsWith("/resources")
                    ? "bg-[--surface-card]"
                    : "bg-surface-card"
                }`}
              >
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="flex items-center justify-between w-full text-lg font-medium text-general-black"
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
                    <div className="space-y-8">
                      {resourcesItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={`block text-base p-2 rounded-xl text-general-black ${
                            isActiveLink(item.href) ? "bg-[--surface-card]" : ""
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6">
                <ButtonComponent fullWidth onClick={() => setIsOpen(!isOpen)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[105] bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}
