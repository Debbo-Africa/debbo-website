"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ButtonComponent from "./Button";
import emailjs from "@emailjs/browser";

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
        const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
        const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
          const timestamp = new Date().toISOString();
          const emailSubject = `New Contact Form Submission from ${
            formData.firstName || ""
          } ${formData.lastName || ""}`;
          const emailMessage = `Someone with the name ${
            formData.firstName || "N/A"
          } ${formData.lastName || "N/A"} has submitted a message.
Details:
Email: ${formData.email || "N/A"}
Phone: ${formData.phoneNumber || "N/A"}
Company: ${formData.companyName || "N/A"}
Message: ${formData.message || "N/A"}
Submitted At: ${timestamp}
`;

          const templateParams = {
            from_name: `${formData.firstName || "Guest"} ${
              formData.lastName || ""
            }`,
            to_email: "isaackeyz55@gmail.com",
            subject: emailSubject,
            message: emailMessage,
            user_email: formData.email || "N/A",
            user_phone: formData.phoneNumber || "N/A",
            company_name: formData.companyName || "N/A",
            timestamp: timestamp,
          };

          try {
            await emailjs.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              templateParams,
              EMAILJS_PUBLIC_KEY
            );
            console.log("Email sent successfully via EmailJS from client.");
          } catch (emailError) {
            console.error(
              "Error sending email via EmailJS from client:",
              emailError
            );
            toast({
              title: "Email Error!",
              description:
                "Failed to send email notification. Please check EmailJS configuration.",
              variant: "destructive",
            });
          }
        } else {
          console.warn(
            "EmailJS environment variables are not fully configured on client. Skipping email sending."
          );
        }

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
