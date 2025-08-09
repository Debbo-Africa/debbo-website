import { type NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface SubscriptionData {
  email: string;
}

interface GoogleSheetResult {
  success: boolean;
  message?: string;
}

interface SubscriptionApiResponse {
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
): Promise<NextResponse<SubscriptionApiResponse>> {
  try {
    const { email }: SubscriptionData = await request.json();

    if (!email) {
      return NextResponse.json<SubscriptionApiResponse>(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const timestamp: string = new Date().toISOString();

    console.log("Processing subscription for email:", email);

    const params = new URLSearchParams();
    params.append("timestamp", timestamp);
    params.append("email", email);

    const response: Response = await fetch(
      "https://script.google.com/macros/s/AKfycbylCgJ3sLz-8lIPcmJSVXpCZMkxW808QeYCUn3o3sUp3MPygyh7P-jgLYp9XkZUKsorsg/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      const errorText: string = await response.text();
      console.error("HTTP error for subscription:", response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText: string = await response.text();
    let result: GoogleSheetResult;

    try {
      result = JSON.parse(responseText) as GoogleSheetResult;
    } catch (error) {
      result = { success: response.ok, message: responseText };
    }

    console.log("Subscription processed:", result);

    if (!result || !result.success) {
      throw new Error(
        result.message || "Failed to submit subscription to Google Sheet."
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
      return NextResponse.json<SubscriptionApiResponse>({
        success: true,
        message:
          "You have successfully subscribed! Email notification skipped due to missing AWS SES configuration.",
      });
    }

    try {
      const emailSubject: string = "New Newsletter Subscription";
      const emailBody: string = `NEW NEWSLETTER SUBSCRIPTION
========================

Email: ${email}
Subscription Date: ${new Date(timestamp).toLocaleString()}

---
This subscription has been automatically saved to your Google Sheets database.
Next Steps: Consider sending a welcome email to the new subscriber.`;

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

      console.log(
        "Subscription email sent successfully via AWS SES:",
        sesResult.MessageId
      );

      return NextResponse.json<SubscriptionApiResponse>({
        success: true,
        message: "You have successfully subscribed!",
        emailSent: true,
        messageId: sesResult.MessageId,
      });
    } catch (sesError: unknown) {
      console.error("Error sending subscription email via AWS SES:", sesError);

      let emailErrorMessage = "Subscription email notification failed";

      if (sesError instanceof Error) {
        if (sesError.name === "MessageRejected") {
          emailErrorMessage = "Subscription email was rejected by SES";
        } else if (sesError.name === "MailFromDomainNotVerifiedException") {
          emailErrorMessage = "SES sender domain is not verified";
        } else if (sesError.name === "SendingPausedException") {
          emailErrorMessage = "SES email sending is currently paused";
        }

        console.error(`${emailErrorMessage}:`, sesError.message);
      }

      return NextResponse.json<SubscriptionApiResponse>({
        success: true,
        message:
          "You have successfully subscribed! However, email notification failed.",
        emailSent: false,
        emailError: emailErrorMessage,
      });
    }
  } catch (fetchError: unknown) {
    console.error(
      "Error sending subscription data to Google Sheet:",
      fetchError
    );

    return NextResponse.json<SubscriptionApiResponse>(
      {
        success: false,
        message: "Failed to subscribe. Please try again.",
        error:
          fetchError instanceof Error ? fetchError.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
