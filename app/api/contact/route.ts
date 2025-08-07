import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json();
    const { firstName, lastName, email, phoneNumber, companyName, message } =
      contactData;
    const timestamp = new Date().toISOString();

    console.log("Processing contact submission:", {
      email,
      timestamp,
    });

    // --- Google Sheet Submission ---
    const formData = new FormData();
    formData.append("timestamp", timestamp);
    formData.append("firstName", firstName || "");
    formData.append("lastName", lastName || "");
    formData.append("email", email || "");
    formData.append("phoneNumber", phoneNumber || "");
    formData.append("companyName", companyName || "");
    formData.append("message", message || "");

    const googleSheetResponse = await fetch(
      "https://script.google.com/macros/s/AKfycbyfvJ13LAAYHzHv_sIChpPdZs3pKUN6yIFS2sjJhsD-mRxE-x2H7vn4EabJOFqB5PJquQ/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!googleSheetResponse.ok) {
      const errorText = await googleSheetResponse.text();
      console.error(
        "HTTP error for contact submission to Google Sheet:",
        googleSheetResponse.status,
        errorText
      );
      throw new Error(`HTTP error! status: ${googleSheetResponse.status}`);
    }

    const googleSheetResponseText = await googleSheetResponse.text();
    let googleSheetResult;
    try {
      googleSheetResult = JSON.parse(googleSheetResponseText);
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

    // --- EmailJS Integration ---
    // Ensure these environment variables are set in your Vercel project settings
    const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY; // Your EmailJS User ID
    const EMAILJS_PRIVATE_KEY = process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY; // Your EmailJS Private Key for server-side sending

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      !EMAILJS_PRIVATE_KEY
    ) {
      console.warn(
        "EmailJS environment variables are not fully configured. Skipping email sending."
      );
      // Still return success for Google Sheet submission if email config is missing
      return NextResponse.json({
        success: true,
        message:
          "Your message has been sent successfully to Google Sheet! Email notification skipped due to missing configuration.",
      });
    }

    const emailSubject = `New Contact Form Submission from ${firstName || ""} ${
      lastName || ""
    }`;
    const emailMessage = `Someone with the name ${firstName || "N/A"} ${
      lastName || "N/A"
    } has submitted a message on Google Sheet.
    
    Details:
    Email: ${email || "N/A"}
    Phone: ${phoneNumber || "N/A"}
    Company: ${companyName || "N/A"}
    Message: ${message || "N/A"}
    Submitted At: ${timestamp}
    `;

    const emailJsPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY, 
      template_params: {
        from_name: `${firstName || "Guest"} ${lastName || ""}`,
        to_email: "isaackeyz55@example.com", 
        subject: emailSubject,
        message: emailMessage,
        user_email: email || "N/A",
        user_phone: phoneNumber || "N/A",
        company_name: companyName || "N/A",
        timestamp: timestamp,
      },
    };

    const emailJsResponse = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailJsPayload),
      }
    );

    if (!emailJsResponse.ok) {
      const emailJsErrorText = await emailJsResponse.text();
      console.error(
        "Error sending email via EmailJS:",
        emailJsResponse.status,
        emailJsErrorText
      );
      // Do not throw an error here, as the Google Sheet submission was successful.
      // Just log the email error and proceed with the success response for the form.
    } else {
      console.log("Email sent successfully via EmailJS.");
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully! We will get back to you shortly.",
    });
  } catch (fetchError) {
    console.error("Error processing contact submission:", fetchError);
    return NextResponse.json(
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
