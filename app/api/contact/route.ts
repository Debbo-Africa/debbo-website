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

    const formData = new FormData();
    formData.append("timestamp", timestamp);
    formData.append("firstName", firstName || "");
    formData.append("lastName", lastName || "");
    formData.append("email", email || "");
    formData.append("phoneNumber", phoneNumber || "");
    formData.append("companyName", companyName || "");
    formData.append("message", message || "");

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyfvJ13LAAYHzHv_sIChpPdZs3pKUN6yIFS2sjJhsD-mRxE-x2H7vn4EabJOFqB5PJquQ/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "HTTP error for contact submission:",
        response.status,
        errorText
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (error) {
      result = { success: response.ok, message: responseText };
    }

    console.log("Contact submission processed:", result);

    if (!result || !result.success) {
      throw new Error(
        result.message || "Failed to submit contact form to Google Sheet."
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully! We will get back to you shortly.",
    });
  } catch (fetchError) {
    console.error("Error sending data to Google Sheet:", fetchError);
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
