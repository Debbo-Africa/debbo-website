"use client";

import React, { useState } from "react";
import Image from "next/image";
import ButtonComponent from "./Button";
import {
  BookAppointmentModal,
  type AppointmentFormVariant,
} from "./book-appointment-modal";

interface PageHeroProps {
  title: string;
  description: string;
  imageSrc?: string;
  leftImageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  headingClassName?: string;
  textClassName?: string;
  showBookButton?: boolean;
  appointmentVariant?: AppointmentFormVariant;
}

export function PageHero({
  title,
  description,
  imageSrc,
  leftImageSrc,
  imageAlt = "",
  imageWidth = 400,
  imageHeight = 300,
  className = "",
  headingClassName = "",
  textClassName = "",
  showBookButton = false,
  appointmentVariant = "individual",
}: PageHeroProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div
      className={`mb-12 mx-auto relative px-4 mt-16 lg:mt-10 lg:px-0 ${className}`}
    >
      {/* Left Image for small screen */}
      {(leftImageSrc || imageSrc) && (
        <div className="absolute left-0 -translate-y-1/2 block md:hidden">
          <Image
            src={leftImageSrc ? leftImageSrc : imageSrc!}
            alt={imageAlt}
            width={60}
            height={60}
            className={`w-40 md:w-56 h-auto ${
              leftImageSrc ? "" : "rotate-180"
            }`}
          />
        </div>
      )}

      {imageSrc && (
        <>
          {/* Existing images with rotation for md screens */}
          <div className="absolute left-0 rotate-180 -translate-y-1/2 hidden md:block lg:hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={100}
              height={100}
              className="w-40 md:w-56 h-auto"
            />
          </div>
          <div className="absolute right-0 -translate-y-1/2 hidden md:block lg:hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={100}
              height={100}
              className="w-40 md:w-56 h-auto"
            />
          </div>

          {/* Existing small screen right image */}
          <div className="absolute right-0 -translate-y-1/2 block md:hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={60}
              height={60}
              className="w-40 md:w-56 h-auto"
            />
          </div>
        </>
      )}

      <div className="relative grid lg:grid-cols-2 gap-32 items-center">
        <div className="lg:pl-20 text-center lg:text-left mt-20 lg:mt-0">
          <h1
            className={`${headingClassName} text-3xl md:text-4xl font-bold text-general-black mb-4 px-10 lg:px-0 `}
          >
            {title}
          </h1>
          <p className={`${textClassName} text-lg text-body-text-gray`}>
            {description}
          </p>
          {showBookButton && (
            <div className="mt-6 flex justify-center lg:justify-start">
              <ButtonComponent
                text="Book appointment"
                linkTo=""
                onClick={() => setModalOpen(true)}
              />
            </div>
          )}
        </div>

        {imageSrc && (
          <div className="hidden lg:block relative overflow-visible">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              className="w-[90%] h-auto translate-x-[10%] object-right"
            />
          </div>
        )}
      </div>
    </div>

    {modalOpen && (
      <BookAppointmentModal
        onClose={() => setModalOpen(false)}
        variant={appointmentVariant}
      />
    )}
    </>
  );
}
