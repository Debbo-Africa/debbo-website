import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const { cartItems, formData, total } = orderData;

    const orderId = `ORDER-${Date.now()}`;
    const timestamp = new Date().toISOString();

    console.log("Processing order:", {
      orderId,
      itemCount: cartItems.length,
      total,
    });

    const promises = cartItems.map(async (item: any, index: number) => {
      const individualFormData = new FormData();

      individualFormData.append("firstName", formData.firstName);
      individualFormData.append("lastName", formData.lastName);
      individualFormData.append("email", formData.email);
      individualFormData.append("phoneNumber", formData.phoneNumber);
      individualFormData.append("specialNote", formData.specialNote);
      const numericPrice =
        Number.parseFloat(item.price.replace(/[₦,\s]/g, "")) || 0;
      const itemTotal = numericPrice * item.quantity;

      individualFormData.append("testName", item.testName);
      individualFormData.append(
        "testPrice",
        `₦${numericPrice.toLocaleString()}`
      );
      individualFormData.append("testCategory", item.category || "");
      individualFormData.append("testType", item.type || "");
      individualFormData.append("testQuantity", item.quantity.toString());
      individualFormData.append("testCount", item.testCount?.toString() || "1");
      individualFormData.append("itemTotal", `₦${itemTotal.toLocaleString()}`);

      individualFormData.append("isScan", item.isScan?.toString() || "false");
      individualFormData.append("itemType", item.isScan ? "scan" : "test");

      individualFormData.append("orderId", orderId);
      individualFormData.append("itemNumber", (index + 1).toString());
      individualFormData.append("totalItems", cartItems.length.toString());
      individualFormData.append("orderTotal", `₦${total.toLocaleString()}`);
      individualFormData.append("timestamp", timestamp);

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbwEnmHSjsJs1prkANLA3Z-P9hmvcymo45bTe15nLfd50Q1oa9-4Zc6HrYZlUIiSHqnk/exec",
          {
            method: "POST",
            body: individualFormData,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error for item ${index + 1}:`,
            response.status,
            errorText
          );
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (error) {}

        console.log(`Item ${index + 1} processed:`, result);
        return result;
      } catch (fetchError) {
        throw fetchError;
      }
    });
    const results = await Promise.all(promises);
    const hasFailures = results.some((result) => !result || !result.success);

    if (hasFailures) {
      console.error(
        "Some items failed:",
        results.filter((r) => !r || !r.success)
      );
      throw new Error("Some items failed to submit");
    }


    return NextResponse.json({
      success: true,
      message:
        "Order submitted successfully! Our team will reach out to you shortly to finalize the details.",
      orderId: orderId,
      itemsProcessed: cartItems.length,
    });
  } catch (error) {
    console.error("Error submitting order:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit order. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
