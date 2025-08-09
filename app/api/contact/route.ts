import { type NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  companyName?: string;
  message?: string;
}

interface GoogleSheetResult {
  success: boolean;
  message: string;
}

interface ApiResponse {
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

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  try {
    const contactData: ContactFormData = await request.json();
    const { firstName, lastName, email, phoneNumber, companyName, message } =
      contactData;
    const timestamp: string = new Date().toISOString();

    console.log("Processing contact submission:", {
      email,
      timestamp,
    });

   
    const formData = new FormData();
    formData.append("timestamp", timestamp);
    formData.append("firstName", firstName || "");
    formData.append("lastName", lastName || "");
    formData.append("email", email || "");
    formData.append("phoneNumber", phoneNumber || "");
    formData.append("companyName", companyName || "");
    formData.append("message", message || "");

    const googleSheetResponse: Response = await fetch(
      "https://script.google.com/macros/s/AKfycbyfvJ13LAAYHzHv_sIChpPdZs3pKUN6yIFS2sjJhsD-mRxE-x2H7vn4EabJOFqB5PJquQ/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!googleSheetResponse.ok) {
      const errorText: string = await googleSheetResponse.text();
      console.error(
        "HTTP error for contact submission to Google Sheet:",
        googleSheetResponse.status,
        errorText
      );
      throw new Error(`HTTP error! status: ${googleSheetResponse.status}`);
    }

    const googleSheetResponseText: string = await googleSheetResponse.text();
    let googleSheetResult: GoogleSheetResult;

    try {
      googleSheetResult = JSON.parse(
        googleSheetResponseText
      ) as GoogleSheetResult;
    } catch (error) {
      googleSheetResult = {
        success: googleSheetResponse.ok,
        message: googleSheetResponseText,
      };
    }

    console.log(
      "Contact submission processed by Google Sheet:",
      googleSheetResult
    );

    if (!googleSheetResult || !googleSheetResult.success) {
      throw new Error(
        googleSheetResult.message ||
          "Failed to submit contact form to Google Sheet."
      );
    }

    const AWS_SES_SENDER: string | undefined =
      process.env.NEXT_PUBLIC_AWS_SES_SENDER;
    const AWS_SES_RECIPIENT: string =
      process.env.NEXT_PUBLIC_AWS_SES_RECIPIENT || "isaackeyz55@gmail.com";

    if (
      !process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ||
      !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ||
      !AWS_SES_SENDER
    ) {
      console.warn(
        "AWS SES environment variables are not fully configured. Skipping email sending."
      );
      return NextResponse.json<ApiResponse>({
        success: true,
        message:
          "Your message has been sent successfully to Google Sheet! Email notification skipped due to missing AWS SES configuration.",
      });
    }

    try {
      const emailSubject: string =
        `New Contact Form Submission from ${firstName || ""} ${
          lastName || ""
        }`.trim() || "New Contact Form Submission";

      const emailBody: string = `NEW CONTACT FORM SUBMISSION
=========================

Name: ${firstName || "N/A"} ${lastName || "N/A"}
Email: ${email || "N/A"}
Phone: ${phoneNumber || "N/A"}
Company: ${companyName || "N/A"}
Submission Date: ${new Date(timestamp).toLocaleString()}

MESSAGE:
${message || "N/A"}

---
This contact form submission has been automatically saved to your Google Sheets database.
Next Steps: Please follow up with the customer via their provided contact information.`;

      const sesParams = {
        Source: AWS_SES_SENDER,
        Destination: {
          ToAddresses: [AWS_SES_RECIPIENT],
        },
        Message: {
          Subject: {
            Data: emailSubject,
            Charset: "UTF-8",
          },
          Body: {
            Text: {
              Data: emailBody,
              Charset: "UTF-8",
            },
          },
        },
      };

      const command = new SendEmailCommand(sesParams);
      const sesResult = await sesClient.send(command);

      console.log("Email sent successfully via AWS SES:", sesResult.MessageId);

      return NextResponse.json<ApiResponse>({
        success: true,
        message:
          "Your message has been sent successfully! We will get back to you shortly.",
        emailSent: true,
        messageId: sesResult.MessageId,
      });
    } catch (sesError: unknown) {
      console.error("Error sending email via AWS SES:", sesError);

      let emailErrorMessage = "Email notification failed";

      if (sesError instanceof Error) {
        if (sesError.name === "MessageRejected") {
          emailErrorMessage = "Email was rejected by SES";
        } else if (sesError.name === "MailFromDomainNotVerifiedException") {
          emailErrorMessage = "SES sender domain is not verified";
        } else if (sesError.name === "SendingPausedException") {
          emailErrorMessage = "SES email sending is currently paused";
        }

        console.error(`${emailErrorMessage}:`, sesError.message);
      }

      return NextResponse.json<ApiResponse>({
        success: true,
        message:
          "Your message has been sent successfully to Google Sheet! However, email notification failed.",
        emailSent: false,
        emailError: emailErrorMessage,
      });
    }
  } catch (fetchError: unknown) {
    console.error("Error processing contact submission:", fetchError);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to send your message. Please try again.",
        error:
          fetchError instanceof Error ? fetchError.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
