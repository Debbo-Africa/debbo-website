"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import ButtonComponent from "./Button";

export const DownloadSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appUrl =
    "https://play.google.com/store/apps/details?id=com.debboafrica.app";

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (canvasRef.current) {
          const canvasSize = canvasRef.current.offsetWidth || 80;
          await QRCode.toCanvas(canvasRef.current, appUrl, {
            width: canvasSize,
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
    window.addEventListener("resize", generateQRCode);
    return () => {
      window.removeEventListener("resize", generateQRCode);
    };
  }, [appUrl]);

  return (
    <section className="px-4 mx-auto mb-16">
      <div className="space-y-6">
        {/* <div className="relative rounded-3xl overflow-hidden h-[550px] lg:h-[500px] w-full group">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/images/app-download-mobile.png')] md:bg-[url('/images/app-download.png')] lg:bg-[url('/images/app-download.png')] transform transition-transform duration-500 ease-in-out group-hover:scale-105" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between">
              <h2 className="text-2xl max-w-[10rem] sm:text-4xl lg:text-5xl font-bold text-general-white mb-4 sm:mb-0 md:leading-loose sm:max-w-xs">
                Download The MyDébbo App Today
              </h2>
            </div>

            <div className="flex items-end md:justify-between justify-center">
              <ButtonComponent />
              <div className="bg-general-white rounded-lg p-1.5 sm:p-2 md:flex md:static absolute top-4 right-4">
                <canvas ref={canvasRef} className="w-24 h-24 lg:w-32 lg:h-32" />
              </div>
            </div>
          </div>
        </div> */}

        <div className="relative rounded-3xl overflow-hidden h-[500px] sm:h-[320px] lg:h-[650px] w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/download.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex items-end">
            <h1 className="hidden md:block sm:text-2xl lg:text-8xl font-bold text-general-white leading-relaxed">
              Closing
              <br />
              the gender
              <br />
              health gap
            </h1>
            <h2 className="text-3xl md:hidden font-bold text-general-white leading-tight">
              Closing the gender health gap
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
