"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import QRCode from "qrcode";
import Tagline from "./Tagline";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const appUrl =
    "https://play.google.com/store/apps/details?id=com.debboafrica.app";

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#D76441] rounded-t-3xl mt-10 overflow-hidden">
      <Tagline bgColor="none" textColor="text-[#DF8367]" />
      <div className="relative z-10 px-4 pb-8">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* First Card */}
            <div className="rounded-3xl p-6 md:p-10 relative overflow-hidden min-h-[450px] flex items-center bg-[url('/images/woman-headphones.png')] bg-cover bg-no-repeat bg-center ">
              <div className=" absolute md:relative top-6 md:top-0 z-10 max-w-[18rem] md:max-w-[16rem] max-auto">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Stay connected with DébboAfrica!
                </h3>
                <form
                  onSubmit={handleSubscribe}
                  className="space-y-4 mt-[10rem] md:mt-0"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. test@debboafrica.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Subscribe →
                  </button>
                </form>
              </div>
            </div>

            <div className="text-white rounded-3xl p-6 md:p-10 relative overflow-hidden min-h-[450px] bg-[url('/images/phone-app-mobile.png')] md:bg-[url('/images/phone-app.png')] bg-cover bg-no-repeat bg-right flex items-center md:items-start">
              <div className="relative z-10 w-full h-full">
                <div className="absolute top-4 right-2 md:static md:mb-4 w-24 h-24 bg-white rounded-lg p-2 mx-auto md:mx-0">
                  <canvas ref={canvasRef} className="w-full h-full rounded" />
                </div>

                <h3 className="absolute top-4 left-2 max-w-44 md:w-fit md:static text-xl md:text-2xl font-bold mb-6">
                  Download My Debbo <br /> App Today
                </h3>

                <div className="absolute bottom-4  transform  md:static md:mt-10 flex items-center gap-2">
                  <Image
                    src="/images/android-download.png"
                    alt="Download on Google Play"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                  <Image
                    src="/images/app-store-download.png"
                    alt="Download on App Store"
                    width={160}
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Rest of Footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
            {/* Logo and Contact */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <Image
                src="/images/debbo-logo.svg"
                alt="DébboAfrica"
                width={120}
                height={40}
                className="mb-4"
              />
              <div className="text-white/80 text-sm space-y-2">
                <p>info@debboafrica.com</p>
                <p>Block 82, Plot 4 Omorinre Johnson,</p>
                <p>Lekki phase 1, Lagos</p>
                <p>+2349090076330</p>
              </div>
              <div className="mt-4 flex items-center gap-2 bg-[#DF8367] rounded-3xl w-fit px-6 py-2">
                <Image
                  src="/images/medical-badge.png"
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
              <h5 className="text-white/80 font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-white text-sm">
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Download App
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Our Brand Alias
                  </a>
                </li>
              </ul>
            </div>

            {/* Individual */}
            <div>
              <h5 className="text-white/80 font-semibold mb-4">Individual</h5>
              <ul className="space-y-2 text-white text-sm">
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Corporate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Individual
                  </a>
                </li>
              </ul>
            </div>

            {/* News & Events */}
            <div>
              <h5 className=" text-white/80  mb-4">Resources & legal</h5>
              <ul className="space-y-2 text-white font-semibold text-sm">
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    News & Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    Glossary
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Payment Partners */}
            <div>
              <h4 className="text-white/80  mb-4">HMO partners</h4>
              <div className="grid grid-cols-2 gap-3">
                <Image
                  src="/images/AXA_Mansard.png"
                  alt="AXA Mansard"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/reliance.png"
                  alt="Reliance"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/leadway.png"
                  alt="Leadway"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/Allianz-1.png"
                  alt="Allianz"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
                <Image
                  src="/images/bupa.png"
                  alt="BUPA"
                  width={80}
                  height={40}
                  className="h-6 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              <p>Copyright © 2024 Debbo. All rights reserved.</p>
              <div className="flex gap-4 mt-2">
                <a href="#" className="hover:text-white transition-colors">
                  Privacy policy
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of use
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Facebook className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 relative bg-[url('/images/footer-bg.png')] bg-cover  bg-no-repeat w-full h-[200px]"></div>
    </footer>
  );
};

export default Footer;
