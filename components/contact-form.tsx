"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ButtonComponent from "./Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "default",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          companyName: "",
          message: "",
        });
      } else {
        toast({
          title: "Error!",
          description: result.message || "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error!",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
    >
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
          value={formData.firstName}
          onChange={handleChange}
          disabled={loading}
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
          value={formData.lastName}
          onChange={handleChange}
          disabled={loading}
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
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>
      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-text-body"
        >
          Phone Number
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Phone Number"
          className="bg-[--surface-card] outline-none border-none h-12 text-text-body"
          value={formData.phoneNumber}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label
          htmlFor="companyName"
          className="text-sm font-medium text-text-body"
        >
          Company Name
        </label>
        <Input
          id="companyName"
          type="text"
          placeholder="Company Name"
          className="bg-[--surface-card] text-text-body outline-none border-none h-12"
          value={formData.companyName}
          onChange={handleChange}
          disabled={loading}
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
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <ButtonComponent
        type="submit"
        text={loading ? "Sending..." : "Send Message"}
        arrow={false}
        fullWidth
        className="sm:col-span-2 text-center"
        disabled={loading}
        linkTo=""
      />
    </form>
  );
}
