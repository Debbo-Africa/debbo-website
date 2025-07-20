"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="firstName"
          className="text-sm font-medium text-text-body"
        >
          First Name
        </label>
        <Input
          id="firstName"
          type="text"
          placeholder="First Name"
          className="bg-[--surface-card] outline-none border-none h-12 text-text-body"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="lastName"
          className="text-sm font-medium text-text-body"
        >
          Last Name
        </label>
        <Input
          id="lastName"
          type="text"
          placeholder="Last Name"
          className="bg-[--surface-card] outline-none border-none h-12 text-text-body"
        />
      </div>

      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label htmlFor="email" className="text-sm font-medium text-text-body">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="bg-[--surface-card] outline-none border-none h-12 text-text-body"
        />
      </div>

      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label htmlFor="phone" className="text-sm font-medium text-text-body">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="Phone Number"
          className="bg-[--surface-card] outline-none border-none h-12 text-text-body"
        />
      </div>

      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label htmlFor="company" className="text-sm font-medium text-text-body">
          Company Name
        </label>
        <Input
          id="company"
          type="text"
          placeholder="Company Name"
          className="bg-[--surface-card] text-text-body outline-none border-none h-12"
        />
      </div>

      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-text-body">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Message"
          className="h-28 text-text-body resize-none bg-[--surface-card] outline-none border-none"
        />
      </div>

      <Button
        type="submit"
        className="sm:col-span-2 bg-[#0D0D0DFC] hover:bg-slate-950 text-white py-3 rounded-full text-sm hover:opacity-90 transition"
      >
        Send Message →
      </Button>
    </form>
  );
}
