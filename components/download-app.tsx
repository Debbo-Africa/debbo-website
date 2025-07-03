"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import QRCode from "qrcode";

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
    <section className="px-4 mx-auto">
      <div className="bg-[#F2E9DD] -mt-10 gap-2 mb-10 md:my-12 p-4 px-4 flex mx-auto justify-center items-center rounded-full w-fit">
        <Image
          src="/images/medical-badge.png"
          alt="Medical certification"
          width={16}
          height={16}
        />
        <p className="text-[#6B6B6B] text-sm">
          Built with your health data privacy in mind.
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative rounded-3xl overflow-hidden h-[550px] lg:h-[600px] w-full">
          <div className="absolute bg-[url('/images/app-download-mobile.png')] md:bg-[url('/images/app-download.png')] lg:bg-[url('/images/app-download.png')] inset-0 bg-cover bg-center bg-no-repeat" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-0 leading-normal">
                Download
                <br />
                MyDebbo
                <br />
                App Today
              </h2>
            </div>

            <div className="flex items-end md:justify-between justify-center">
              <div className="flex gap-2">
                <Image
                  src="/images/android-download.png"
                  alt="Download on Google Play"
                  width={120}
                  height={36}
                  className="h-12 lg:h-16 w-auto"
                />
                <Image
                  src="/images/app-store-download.png"
                  alt="Download on App Store"
                  width={120}
                  height={36}
                  className="h-12 lg:h-16 w-auto"
                />
              </div>

              <div className="bg-white rounded-lg p-1.5 sm:p-2 md:flex md:static absolute top-4 right-4">
                <canvas ref={canvasRef} className="w-24 h-24" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden h-[500px] sm:h-[320px] lg:h-[600px] w-full">
          <div className="absolute bg-[url('/images/woman-smiling-bg.png')] inset-0 bg-cover bg-center bg-no-repeat" />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex items-end">
            <h2 className="hidden md:block sm:text-2xl lg:text-4xl font-bold text-white leading-tight">
              Closing
              <br />
              the gender
              <br />
              health gap
            </h2>
            <h2 className="text-3xl md:hidden font-bold text-white leading-tight">
              Closing the gender health gap
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
