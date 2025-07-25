"use client";

import React from "react";
import ButtonComponent from "./Button";

interface Service {
  name: string;
  description: string;
}

const services: Service[] = [
  {
    name: "Levornogestrel 1.5mg (Emergency Contraception)",
    description:
      "A single-dose oral contraceptive pill used to prevent pregnancy after unprotected sex. Most effective when taken within 72 hours.",
  },
  {
    name: "IUD Insertion",
    description:
      "A small device is placed inside the uterus to prevent pregnancy. It offers long-term, reversible contraception lasting 5 to 10 years.",
  },
  {
    name: "IUD Removal",
    description:
      "A simple procedure to take out an intrauterine device. Removal is quick and usually done when it's expired, no longer needed, or causing issues.",
  },
  {
    name: "Displaced IUD Removal (Ultrasound Guided)",
    description:
      "Used when an IUD is out of position or difficult to locate. Ultrasound guidance helps ensure safe and accurate removal.",
  },
  {
    name: "Implant Insertion",
    description:
      "A small, flexible rod is placed under the skin of the upper arm. It provides effective contraception for up to three years.",
  },
  {
    name: "Implant Removal",
    description:
      "A quick procedure to remove the contraceptive implant from the arm. Usually done when it expires, causes side effects, or if pregnancy is desired.",
  },
];

export default function ContraceptionTable() {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto lg:px-0">
      <h2 className="text-3xl font-semibold text-center mb-4">
        Contraception & Family Planning Services
      </h2>
      <p className="text-center text-body-text-gray mb-8 max-w-2xl mx-auto">
        We also offer confidential, judgment-free consultations with licensed
        medical experts. Whether you’re starting, switching, or just exploring
        options — we’re here to help. Prices available on request.
      </p>
      <div className="flex justify-center mb-8">
        <ButtonComponent text="Get Started" linkTo="/contact-us" arrow={ false} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className=" bg-[--surface-card]">
              <th className="py-3 px-4 font-bold">Service</th>
              <th className="py-3 px-4 font-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr
                key={service.name}
                className={`${
                  index % 2 === 0 ? "" : "bg-[--surface-card]"
                } w-full`}
              >
                <td className="py-4 px-4 align-top w-1/2">{service.name}</td>
                <td className="py-4 px-4 text-body-text-gray w-1/2">
                  {service.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
