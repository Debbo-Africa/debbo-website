"use client";
import { useState, useEffect, useRef } from "react";
import type React from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import Tagline from "./Tagline";
import Link from "next/link";
import ButtonComponent from "./Button";
import { useToast } from "@/hooks/use-toast"; // Import useToast

type FooterLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const FooterLink = ({ href, children, className }: FooterLinkProps) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(href);
  };
  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appUrl =
    "https://play.google.com/store/apps/details?id=com.debboafrica.app";
  const { toast } = useToast(); // Initialize toast

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, appUrl, {
            width: 80,
            margin: 1,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          });
        }
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQRCode();
  }, [appUrl]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submission

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "default",
        });
        setEmail(""); 
      } else {
        toast({
          title: "Error!",
          description:
            result.message || "Something went wrong with your subscription.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Subscription form submission error:", error);
      toast({
        title: "Error!",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <footer className="relative bg-secondary-debbo1 rounded-t-3xl mt-10 overflow-hidden">
      <Tagline
        bgColor="none"
        textColor="text-secondary-debbo"
        imageSrc="/images/brand-icon.svg"
      />
      <div className="relative z-10 px-4 pb-8">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden min-h-[450px] md:min-h-[400px] flex justify-between bg-[url('/images/woman-headphones.png')] bg-cover bg-no-repeat bg-center">
              <div className="flex flex-col justify-between  space-y-6 max-w-[18rem] md:max-w-[16rem]">
                <h3 className="text-xl md:text-2xl font-bold text-general-black">
                  Stay connected with DébboAfrica!
                </h3>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-body-text-gray mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email" // Add name attribute
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. test@debboafrica.com"
                      className="w-full px-4 py-3 rounded-lg outline-none bg-[--surface-card] focus:ring-none focus:border-transparent"
                      required
                      disabled={loading} // Disable input while loading
                    />
                  </div>
                  <ButtonComponent
                    text={loading ? "Subscribing..." : "Subscribe"}
                    className="w-full mt-3"
                    disabled={loading}
                    linkTo=""
                  />{" "}
                </form>
              </div>
            </div>
            <div className="text-white rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden min-h-[450px] md:min-h-[400px] bg-[url('/images/phone-app-mobile.png')] md:bg-[url('/images/phone-app.png')] bg-cover bg-no-repeat bg-right flex items-center md:items-start">
              <div className="relative z-10 w-full h-full">
                <div className="absolute top-4 right-2 md:static md:mb-4 w-24 h-24 bg-white rounded-lg p-2 mx-auto md:mx-0">
                  <canvas ref={canvasRef} className="w-full h-full rounded" />
                </div>
                <h3 className="absolute top-4 left-2 max-w-44 md:w-fit md:static text-xl md:text-2xl font-bold mb-6">
                  Download The MyDébbo <br /> App Today
                </h3>
                <div className="absolute bottom-4 md:static md:mt-10 flex items-center gap-2">
                  <Image
                    src="/images/playstore-large.svg"
                    alt="Download on Google Play"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                  <Image
                    src="/images/appstore-large.svg"
                    alt="Download on App Store"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
              <div className="col-span-2">
                <Image
                  src="/images/debbo-logo.svg"
                  alt="DébboAfrica"
                  width={120}
                  height={40}
                  className="mb-4"
                />
                <div className="text-white/80 text-sm space-y-2">
                  <p className="hover:text-white">info@debboafrica.com</p>
                  <p className="hover:text-white">
                    Block 82, Plot 4 Omorinre Johnson,
                  </p>
                  <p className="hover:text-white">Lekki phase 1, Lagos</p>
                  <p className="hover:text-white">+2349090076330</p>
                </div>
                <div className="mt-4 flex items-center gap-2 bg-[#DF8367] rounded-3xl w-fit px-6 py-2">
                  <Image
                    src="/images/medical-badge.svg"
                    alt="Medical certification"
                    width={24}
                    height={24}
                  />
                  <span className="text-white/80 text-xs">
                    Built with your health <br /> data privacy in mind.
                  </span>
                </div>
              </div>
              {/* Quick Links */}
              <div>
                <h5 className="text-white font-bold mb-4">Quick Links</h5>
                <ul className="space-y-2 text-white/80 text-sm">
                  {[
                    { href: "/about/who-we-are", label: "About Us" },
                    { href: "/contact-us", label: "Contact Us" },
                    { href: "/download", label: "Download App" },
                    { href: "/brand-allies", label: "Our Brand Allies" },
                  ].map((link) => (
                    <li key={link.href}>
                      <FooterLink
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-4"> Who We Serve</h5>
                <ul className="space-y-2 text-white/80 text-sm">
                  {[
                    { href: "/individual", label: "Individuals" },
                    { href: "/corporate", label: "Corporate" },
                  ].map((link) => (
                    <li key={link.href}>
                      <FooterLink
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-4">Resources & legal</h5>
                <ul className="space-y-2 text-white/80 font-semibold text-sm">
                  {[
                    {
                      href: "/resources/news-and-event",
                      label: "News & Events",
                    },
                    { href: "/blog", label: "Blog" },
                    { href: "/glossary", label: "Glossary" },
                    { href: "/faqs", label: "FAQs" },
                  ].map((link) => (
                    <li key={link.href}>
                      <FooterLink
                        href={link.href}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-4">HMO partners</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { src: "/images/AXA_Mansard1.svg", alt: "AXA Mansard" },
                    { src: "/images/reliance1.svg", alt: "Reliance" },
                    { src: "/images/leadway1.svg", alt: "Leadway" },
                    { src: "/images/Allianz-11.svg", alt: "Allianz" },
                    { src: "/images/bupa1.svg", alt: "BUPA" },
                  ].map((partner) => (
                    <Image
                      key={partner.alt}
                      src={partner.src || "/placeholder.svg"}
                      alt={partner.alt}
                      width={80}
                      height={40}
                      className="h-8 w-auto"
                    />
                  ))}
                </div>
                <p className="text-white/80 mt-6 mb-4 font-bold">
                  HEFAMAA accredited
                </p>
                <Image
                  src="/images/Hefamaa.svg"
                  alt="Hefamaa"
                  width={80}
                  height={40}
                  className="h-10 w-auto "
                />
              </div>
            </div>
            <div className=" pt-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="text-white/70 text-sm block md:flex flex-cols items-center gap-2">
                <p>Copyright © 2024 Debbo. All rights reserved.</p>
                <div className="flex gap-4 ">
                  <FooterLink
                    href="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy policy
                  </FooterLink>
                  <FooterLink
                    href="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Terms of use
                  </FooterLink>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                {[
                  {
                    src: "/images/Facebook.svg",
                    alt: "Facebook",
                    href: "https://www.facebook.com/debboCD/",
                  },
                  {
                    src: "/images/LinkedIn.svg",
                    alt: "LinkedIn",
                    href: "https://www.linkedin.com/company/d%C3%A8bbo-by-cell-diagnostics/?originalSubdomain=ng",
                  },
                  {
                    src: "/images/Instagram.svg",
                    alt: "Instagram",
                    href: "https://www.instagram.com/debbo_africa/?hl=en",
                  },
                  {
                    src: "/images/YouTube.svg",
                    alt: "YouTube",
                    href: "https://www.youtube.com/@DebboAfrica",
                  },
                  {
                    src: "/images/Twitter.svg",
                    alt: "Twitter",
                    href: "https://x.com/debbo_africa/status/1921954003199369354",
                  },
                ].map((partner) => (
                  <Link
                    key={partner.alt}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={partner.src || "/placeholder.svg"}
                      alt={partner.alt}
                      width={80}
                      height={40}
                      className="h-6 w-auto"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 relative bg-[url('/images/footer-bg.png')] bg-cover bg-no-repeat w-full h-[200px]"></div>
    </footer>
  );
};

export default Footer;
