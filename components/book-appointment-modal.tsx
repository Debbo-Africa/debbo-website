"use client";

import { useEffect, useRef, useState } from "react";
import ButtonComponent from "./Button";

const SERVICES = [
  { id: "staffHealthScreening", label: "Staff Health Screening" },
  { id: "wellnessTalkWorkshop", label: "Wellness Talk/Workshop" },
  { id: "preventiveHealthPackage", label: "Preventive Health Package" },
  { id: "partnership", label: "Partnership" },
];

const BOOKING_TYPES = [
  { id: "laboratoryTest", label: "Laboratory Test" },
  { id: "scan", label: "Scan" },
  { id: "homeSampling", label: "Home Sampling" },
];

const INDUSTRY_OPTIONS = [
  "Tech",
  "Finance",
  "Oil & Gas",
  "Real Estate",
  "Education",
  "NGO",
  "Other",
];

const TEAM_SIZE_OPTIONS = ["1–20", "21–50", "51–100", "100+"];

const SERVICE_NEEDED_OPTIONS = [
  "Fertility",
  "Women's Health",
  "Sexual Health",
  "General Health",
  "Radiology Scan",
  "Other",
];

export type AppointmentFormVariant = "individual" | "corporate";

const inputClass =
  "h-12 rounded-xl bg-[#f2e9dd] border-none outline-none px-4 text-sm text-gray-700 placeholder:text-gray-400";
const textareaClass =
  "rounded-xl bg-[#f2e9dd] border-none outline-none px-4 py-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none";

interface AppointmentApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

/* ─── Custom Dropdown ─────────────────────────────────────────────────────── */
function CustomDropdown({
  placeholder,
  options,
  value,
  onChange,
}: {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-12 w-full rounded-xl bg-[#f2e9dd] px-4 pr-10 text-sm text-left flex items-center justify-between focus:outline-none"
      >
        <span className={value ? "text-gray-700" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <svg
          className={`absolute right-3 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full rounded-xl bg-[#f2e9dd] shadow-md overflow-hidden">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#e8ddd0] transition-colors ${
                value === opt ? "text-gray-900 font-medium" : "text-gray-600"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Form ────────────────────────────────────────────────────────────────── */
interface FormData {
  companyName: string;
  contactPerson: string;
  email: string;
  industry: string;
  services: Record<string, boolean>;
  teamSize: string;
  preferredMeetingDate: string;
  additionalNotes: string;
  consent: boolean;
}

interface IndividualFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  bookingTypes: Record<string, boolean>;
  serviceNeeded: string;
  preferredMeetingDate: string;
  additionalNotes: string;
  consent: boolean;
}

function Checkmark() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 6L5 9L10 3"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckboxRow({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 text-left"
      onClick={onToggle}
    >
      <span
        className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-[#ff9b33]" : "bg-[#f2e9dd]"
        }`}
      >
        {checked && <Checkmark />}
      </span>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}

function ConsentRow({
  checked,
  onToggle,
  text,
}: {
  checked: boolean;
  onToggle: () => void;
  text: string;
}) {
  return (
    <button
      type="button"
      className="flex items-start gap-3 text-left"
      onClick={onToggle}
    >
      <span
        className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
          checked ? "bg-[#ff9b33]" : "bg-[#f2e9dd]"
        }`}
      >
        {checked && <Checkmark />}
      </span>
      <span className="text-sm text-gray-700">{text}</span>
    </button>
  );
}

function IndividualAppointmentForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState<IndividualFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    bookingTypes: {
      laboratoryTest: false,
      scan: true,
      homeSampling: false,
    },
    serviceNeeded: "",
    preferredMeetingDate: "",
    additionalNotes: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdown = (field: keyof IndividualFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBookingType = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      bookingTypes: { ...prev.bookingTypes, [id]: !prev.bookingTypes[id] },
    }));
  };

  const validate = (): boolean => {
    const missing: string[] = [];
    if (!formData.firstName.trim()) missing.push("First Name");
    if (!formData.lastName.trim()) missing.push("Last Name");
    if (!formData.phoneNumber.trim()) missing.push("Phone Number");
    if (!formData.email.trim()) missing.push("Email Address");
    if (!Object.values(formData.bookingTypes).some(Boolean))
      missing.push("what you would like to book");
    if (!formData.serviceNeeded) missing.push("Service Needed");
    if (!formData.preferredMeetingDate) missing.push("Preferred Date and Time");
    if (!formData.consent) missing.push("consent to be contacted");
    setErrors(missing);
    return missing.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const bookingTypes = BOOKING_TYPES.filter(
        (type) => formData.bookingTypes[type.id]
      ).map((type) => type.label);

      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "booking",
          payload: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            bookingTypes,
            serviceNeeded: formData.serviceNeeded,
            preferredDateTime: formData.preferredMeetingDate,
            additionalNotes: formData.additionalNotes,
            consent: formData.consent ? "Yes" : "No",
          },
        }),
      });

      const result = (await response.json()) as AppointmentApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit booking form.");
      }

      onSuccess();
    } catch (error) {
      setErrors([
        error instanceof Error
          ? error.message
          : "Failed to submit booking form.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {errors.length > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          Please fill in: {errors.join(", ")}.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Phone Number</label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm text-text-body">
          What would you like to book?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BOOKING_TYPES.map((type) => (
            <CheckboxRow
              key={type.id}
              label={type.label}
              checked={formData.bookingTypes[type.id]}
              onToggle={() => handleBookingType(type.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">Service Needed</label>
        <CustomDropdown
          placeholder="Choose service"
          options={SERVICE_NEEDED_OPTIONS}
          value={formData.serviceNeeded}
          onChange={(val) => handleDropdown("serviceNeeded", val)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">Preferred Date and Time</label>
        <input
          name="preferredMeetingDate"
          type="datetime-local"
          value={formData.preferredMeetingDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">
          Additional Notes (Optional)
        </label>
        <textarea
          name="additionalNotes"
          placeholder="Message"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={4}
          className={textareaClass}
        />
      </div>

      <ConsentRow
        checked={formData.consent}
        onToggle={() =>
          setFormData((prev) => ({ ...prev, consent: !prev.consent }))
        }
        text="I consent to being contacted by DébboAfrica regarding my booking."
      />

      <div className="mt-10">
        <ButtonComponent
          type="submit"
          text={loading ? "Booking..." : "Book appointment"}
          fullWidth
          disabled={loading}
          linkTo=""
          className="text-center"
        />
      </div>
    </form>
  );
}

function BookAppointmentForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    industry: "",
    services: {
      staffHealthScreening: false,
      wellnessTalkWorkshop: false,
      preventiveHealthPackage: false,
      partnership: false,
    },
    teamSize: "",
    preferredMeetingDate: "",
    additionalNotes: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdown = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      services: { ...prev.services, [id]: !prev.services[id] },
    }));
  };

  const validate = (): boolean => {
    const missing: string[] = [];
    if (!formData.companyName.trim()) missing.push("Company/Organisation Name");
    if (!formData.contactPerson.trim()) missing.push("Contact Person");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.industry) missing.push("Industry");
    if (!Object.values(formData.services).some(Boolean))
      missing.push("at least one Service");
    if (!formData.teamSize) missing.push("Team Size");
    if (!formData.preferredMeetingDate) missing.push("Preferred Meeting Date");
    if (!formData.consent) missing.push("consent to be contacted");
    setErrors(missing);
    return missing.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const services = SERVICES.filter(
        (service) => formData.services[service.id]
      ).map((service) => service.label);

      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "corporate",
          payload: {
            companyName: formData.companyName,
            contactPerson: formData.contactPerson,
            email: formData.email,
            industry: formData.industry,
            interests: services,
            teamSize: formData.teamSize,
            preferredMeetingDate: formData.preferredMeetingDate,
            additionalNotes: formData.additionalNotes,
            consent: formData.consent ? "Yes" : "No",
          },
        }),
      });

      const result = (await response.json()) as AppointmentApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit enquiry form.");
      }

      onSuccess();
    } catch (error) {
      setErrors([
        error instanceof Error
          ? error.message
          : "Failed to submit enquiry form.",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {errors.length > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          Please fill in: {errors.join(", ")}.
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">
          Company/Organisation Name
        </label>
        <input
          name="companyName"
          type="text"
          placeholder="Company/Organisation Name"
          value={formData.companyName}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Contact Person</label>
          <input
            name="contactPerson"
            type="text"
            placeholder="Contact Person"
            value={formData.contactPerson}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-text-body">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">Industry</label>
        <CustomDropdown
          placeholder="Select industry"
          options={INDUSTRY_OPTIONS}
          value={formData.industry}
          onChange={(val) => handleDropdown("industry", val)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm text-text-body">
          What are you interested in?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SERVICES.map((service) => (
            <CheckboxRow
              key={service.id}
              label={service.label}
              checked={formData.services[service.id]}
              onToggle={() => handleCheckbox(service.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">Team Size</label>
        <CustomDropdown
          placeholder="Select team size"
          options={TEAM_SIZE_OPTIONS}
          value={formData.teamSize}
          onChange={(val) => handleDropdown("teamSize", val)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">Preferred Meeting Date</label>
        <input
          name="preferredMeetingDate"
          type="date"
          value={formData.preferredMeetingDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-text-body">
          Additional Notes (Optional)
        </label>
        <textarea
          name="additionalNotes"
          placeholder="Message"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={4}
          className={textareaClass}
        />
      </div>

      <ConsentRow
        checked={formData.consent}
        onToggle={() =>
          setFormData((prev) => ({ ...prev, consent: !prev.consent }))
        }
        text="I consent to being contacted by DébboAfrica regarding this enquiry."
      />

      <div className="mt-10">
        <ButtonComponent
          type="submit"
          text={loading ? "Booking..." : "Book a Discovery Call"}
          fullWidth
          disabled={loading}
          linkTo=""
          className="text-center"
        />
      </div>
    </form>
  );
}

/* ─── Success Modal ───────────────────────────────────────────────────────── */
function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 px-4 pt-24 sm:pt-0 overflow-y-auto">
      <div className="bg-badge rounded-2xl w-full max-w-lg px-10 py-10 flex flex-col items-center text-center gap-5">
        {/* Checkmark circle */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "#0D0D0DFC" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 font-recoleta">
          Appointment booked successfully
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed">
          Thank you for booking with DébboAfrica. Our team will reach out
          shortly to confirm your appointment.
        </p>

        <div className="w-full mt-16">
          <ButtonComponent
            text="Close"
            linkTo=""
            arrow={false}
            onClick={onClose}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Book Modal ──────────────────────────────────────────────────────────── */
export function BookAppointmentModal({
  onClose,
  variant = "corporate",
}: {
  onClose: () => void;
  variant?: AppointmentFormVariant;
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  // Close on backdrop click (only for the form modal)
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (showSuccess) {
    return <SuccessModal onClose={onClose} />;
  }

  const title =
    variant === "corporate" ? "Book a Discovery Call" : "Book appointment today";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 px-4 pt-32 sm:pt-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      onClick={handleBackdrop}
    >
      <div className="relative bg-badge rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto px-6 py-8 sm:px-8 md:px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10 font-recoleta">
          {title}
        </h2>

        {variant === "individual" ? (
          <IndividualAppointmentForm onSuccess={() => setShowSuccess(true)} />
        ) : (
          <BookAppointmentForm onSuccess={() => setShowSuccess(true)} />
        )}
      </div>
    </div>
  );
}
