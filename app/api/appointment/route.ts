import { type NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

type AppointmentType = "corporate" | "booking";

interface AppointmentRequest {
  type: AppointmentType;
  payload: Record<string, string | string[] | boolean | undefined>;
}

interface GoogleSheetResult {
  success: boolean;
  message?: string;
}

interface AppointmentApiResponse {
  success: boolean;
  message: string;
  emailSent?: boolean;
  messageId?: string;
  emailError?: string;
  error?: string;
}

const sesClient = new SESClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

const SHARED_APPOINTMENT_SHEET_URL = process.env.GOOGLE_SHEETS_APPOINTMENT_URL;
const CORPORATE_SHEET_URL =
  process.env.GOOGLE_SHEETS_CORPORATE_ENQUIRY_URL ||
  SHARED_APPOINTMENT_SHEET_URL;
const BOOKING_SHEET_URL =
  process.env.GOOGLE_SHEETS_BOOKING_URL || SHARED_APPOINTMENT_SHEET_URL;

const SHEET_NAMES: Record<AppointmentType, string> = {
  corporate: "Corporate Enquiries",
  booking: "Bookings",
};

function getSheetUrl(type: AppointmentType): string | undefined {
  return type === "corporate" ? CORPORATE_SHEET_URL : BOOKING_SHEET_URL;
}

function appendValue(
  formData: FormData,
  key: string,
  value: string | string[] | boolean | undefined
) {
  if (Array.isArray(value)) {
    formData.append(key, value.join(", "));
    return;
  }

  formData.append(key, value === undefined ? "" : String(value));
}

function buildEmail(
  type: AppointmentType,
  payload: Record<string, string | string[] | boolean | undefined>,
  timestamp: string
): { emailSubject: string; emailBody: string } {
  const submissionDate = new Date(timestamp).toLocaleString();

  if (type === "corporate") {
    const emailSubject = `New Corporate Discovery Call Request – ${payload.companyName || "Unknown Company"}`;
    const interests = Array.isArray(payload.interests)
      ? payload.interests.join(", ")
      : payload.interests || "N/A";

    const emailBody = `NEW CORPORATE DISCOVERY CALL REQUEST
=====================================

Company/Organisation: ${payload.companyName || "N/A"}
Contact Person:       ${payload.contactPerson || "N/A"}
Email:                ${payload.email || "N/A"}
Industry:             ${payload.industry || "N/A"}
Interested In:        ${interests}
Team Size:            ${payload.teamSize || "N/A"}
Preferred Meeting Date: ${payload.preferredMeetingDate || "N/A"}
Consent:              ${payload.consent || "N/A"}

ADDITIONAL NOTES:
${payload.additionalNotes || "None"}

Submission Date: ${submissionDate}

---
This submission has been automatically saved to your Google Sheets database.
Next Steps: Please follow up with the client to schedule the discovery call.`;

    return { emailSubject, emailBody };
  }

  // Individual booking
  const emailSubject = `New Appointment Booking – ${payload.firstName || ""} ${payload.lastName || ""}`.trim() || "New Appointment Booking";
  const bookingTypes = Array.isArray(payload.bookingTypes)
    ? payload.bookingTypes.join(", ")
    : payload.bookingTypes || "N/A";

  const emailBody = `NEW APPOINTMENT BOOKING
=======================

Name:              ${payload.firstName || "N/A"} ${payload.lastName || "N/A"}
Phone:             ${payload.phoneNumber || "N/A"}
Email:             ${payload.email || "N/A"}
Booking Type:      ${bookingTypes}
Service Needed:    ${payload.serviceNeeded || "N/A"}
Preferred Date/Time: ${payload.preferredDateTime || "N/A"}
Consent:           ${payload.consent || "N/A"}

ADDITIONAL NOTES:
${payload.additionalNotes || "None"}

Submission Date: ${submissionDate}

---
This submission has been automatically saved to your Google Sheets database.
Next Steps: Please follow up with the patient to confirm the appointment.`;

  return { emailSubject, emailBody };
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const appointmentData: AppointmentRequest = await request.json();
    const { type, payload } = appointmentData;

    if (type !== "corporate" && type !== "booking") {
      return NextResponse.json<AppointmentApiResponse>(
        { success: false, message: "Invalid appointment form type." },
        { status: 400 }
      );
    }

    const sheetUrl = getSheetUrl(type);

    if (!sheetUrl) {
      return NextResponse.json<AppointmentApiResponse>(
        {
          success: false,
          message: "Google Sheet endpoint is not configured.",
          error:
            "Set GOOGLE_SHEETS_APPOINTMENT_URL, or set GOOGLE_SHEETS_CORPORATE_ENQUIRY_URL and GOOGLE_SHEETS_BOOKING_URL.",
        },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    const formData = new FormData();

    Object.entries(payload || {}).forEach(([key, value]) => {
      appendValue(formData, key, value);
    });

    formData.append("timestamp", timestamp);
    formData.append("formType", type);
    formData.append("sheetName", SHEET_NAMES[type]);

    console.log("Submitting appointment form to Google Sheet:", {
      type,
      sheetName: SHEET_NAMES[type],
      timestamp,
    });

    const response = await fetch(sheetUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "HTTP error for appointment submission to Google Sheet:",
        response.status,
        errorText
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    let result: GoogleSheetResult;

    try {
      result = JSON.parse(responseText) as GoogleSheetResult;
    } catch {
      result = {
        success: response.ok,
        message: responseText,
      };
    }

    if (!result || !result.success) {
      throw new Error(
        result.message || "Failed to submit appointment form to Google Sheet."
      );
    }

    // Send SES email notification to admin
    const AWS_SES_SENDER = "support@debbo.africa";
    const AWS_SES_RECIPIENT = process.env.NEXT_PUBLIC_AWS_SES_RECIPIENT!;

    if (
      !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
      !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ||
      !AWS_SES_SENDER
    ) {
      console.warn(
        "AWS SES environment variables are not fully configured. Skipping email sending."
      );
      return NextResponse.json<AppointmentApiResponse>({
        success: true,
        message:
          type === "corporate"
            ? "Your enquiry has been submitted successfully."
            : "Your booking has been submitted successfully.",
      });
    }

    try {
      const { emailSubject, emailBody } = buildEmail(type, payload, timestamp);

      const command = new SendEmailCommand({
        Source: AWS_SES_SENDER,
        Destination: {
          ToAddresses: [AWS_SES_RECIPIENT],
        },
        Message: {
          Subject: { Data: emailSubject, Charset: "UTF-8" },
          Body: { Text: { Data: emailBody, Charset: "UTF-8" } },
        },
      });

      const sesResult = await sesClient.send(command);
      console.log("Appointment email sent via AWS SES:", sesResult.MessageId);

      return NextResponse.json<AppointmentApiResponse>({
        success: true,
        message:
          type === "corporate"
            ? "Your enquiry has been submitted successfully."
            : "Your booking has been submitted successfully.",
        emailSent: true,
        messageId: sesResult.MessageId,
      });
    } catch (sesError: unknown) {
      console.error("Error sending appointment email via AWS SES:", sesError);

      // Still return success since the Google Sheets submission worked
      return NextResponse.json<AppointmentApiResponse>({
        success: true,
        message:
          type === "corporate"
            ? "Your enquiry has been submitted successfully."
            : "Your booking has been submitted successfully.",
        emailSent: false,
        emailError:
          sesError instanceof Error ? sesError.message : "Email notification failed",
      });
    }
  } catch (error: unknown) {
    console.error("Error processing appointment submission:", error);

    return NextResponse.json<AppointmentApiResponse>(
      {
        success: false,
        message: "Failed to submit the form. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
