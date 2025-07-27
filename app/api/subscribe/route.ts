import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    console.log("Processing subscription for email:", email);

    const formData = new FormData();
    formData.append("timestamp", timestamp);
    formData.append("email", email);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzbvdBeHgw9YBG4sNL9A0TFbt-XFbyBriWa8NpkEg2WKXYUWCszuFV1L6u81d_7kkmr/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP error for subscription:", response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (error) {
      // If response is not JSON, treat it as plain text success or error
      result = { success: response.ok, message: responseText };
    }

    console.log("Subscription processed:", result);

    if (!result || !result.success) {
      throw new Error(
        result.message || "Failed to submit subscription to Google Sheet."
      );
    }

    return NextResponse.json({
      success: true,
      message: "You have successfully subscribed!",
    });
  } catch (fetchError) {
    console.error(
      "Error sending subscription data to Google Sheet:",
      fetchError
    );
    return NextResponse.json(
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
