import { type NextRequest, NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Types
interface CartItem {
  testName: string;
  price: string;
  category?: string;
  type?: string;
  quantity: number;
  testCount?: number;
  isScan?: boolean;
}

interface OrderFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  specialNote?: string;
}

interface OrderData {
  cartItems: CartItem[];
  formData: OrderFormData;
  total: number;
}

interface GoogleSheetResult {
  success: boolean;
  message?: string;
}

interface OrderApiResponse {
  success: boolean;
  message: string;
  orderId?: string;
  itemsProcessed?: number;
  emailSent?: boolean;
  messageId?: string;
  emailError?: string;
  error?: string;
}

const sesClient = new SESClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(
  request: NextRequest
): Promise<NextResponse<OrderApiResponse>> {
  try {
    const orderData: OrderData = await request.json();
    const { cartItems, formData, total } = orderData;

    const orderId: string = `ORDER-${Date.now()}`;
    const timestamp: string = new Date().toISOString();

    console.log("Processing order:", {
      orderId,
      itemCount: cartItems.length,
      total,
    });

    const promises = cartItems.map(
      async (item: CartItem, index: number): Promise<GoogleSheetResult> => {
        const individualFormData = new FormData();

        individualFormData.append("firstName", formData.firstName);
        individualFormData.append("lastName", formData.lastName);
        individualFormData.append("email", formData.email);
        individualFormData.append("phoneNumber", formData.phoneNumber);
        individualFormData.append("specialNote", formData.specialNote || "");

        const numericPrice: number =
          Number.parseFloat(item.price.replace(/[₦,\s]/g, "")) || 0;
        const itemTotal: number = numericPrice * item.quantity;

        individualFormData.append("testName", item.testName);
        individualFormData.append(
          "testPrice",
          `₦${numericPrice.toLocaleString()}`
        );
        individualFormData.append("testCategory", item.category || "");
        individualFormData.append("testType", item.type || "");
        individualFormData.append("testQuantity", item.quantity.toString());
        individualFormData.append(
          "testCount",
          item.testCount?.toString() || "1"
        );
        individualFormData.append(
          "itemTotal",
          `₦${itemTotal.toLocaleString()}`
        );
        individualFormData.append("isScan", item.isScan?.toString() || "false");
        individualFormData.append("itemType", item.isScan ? "scan" : "test");
        individualFormData.append("orderId", orderId);
        individualFormData.append("itemNumber", (index + 1).toString());
        individualFormData.append("totalItems", cartItems.length.toString());
        individualFormData.append("orderTotal", `₦${total.toLocaleString()}`);
        individualFormData.append("timestamp", timestamp);

        try {
          const response: Response = await fetch(
            "https://script.google.com/macros/s/AKfycbxVlHRS9-5eOfS1Gd_9MvKE-1SeXSYTV4QfuXXXrkc2qVljhPO22JSMQD0-4T5FJhbV/exec",
            {
              method: "POST",
              body: individualFormData,
            }
          );

          if (!response.ok) {
            const errorText: string = await response.text();
            console.error(
              `HTTP error for item ${index + 1}:`,
              response.status,
              errorText
            );
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseText: string = await response.text();
          let result: GoogleSheetResult;

          try {
            result = JSON.parse(responseText) as GoogleSheetResult;
          } catch (error) {
            result = {
              success: response.ok,
              message: responseText,
            };
          }

          console.log(`Item ${index + 1} processed:`, result);
          return result;
        } catch (fetchError: unknown) {
          throw fetchError;
        }
      }
    );

    const results: GoogleSheetResult[] = await Promise.all(promises);
    const hasFailures: boolean = results.some(
      (result) => !result || !result.success
    );

    if (hasFailures) {
      console.error(
        "Some items failed:",
        results.filter((r) => !r || !r.success)
      );
      throw new Error("Some items failed to submit");
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
      return NextResponse.json<OrderApiResponse>({
        success: true,
        message:
          "Order submitted successfully to Google Sheets! Email notification skipped due to missing AWS SES configuration.",
        orderId: orderId,
        itemsProcessed: cartItems.length,
      });
    }

    try {
      // Generate items details for email
      const itemsDetails: string = cartItems
        .map((item: CartItem, index: number) => {
          const numericPrice: number =
            Number.parseFloat(item.price.replace(/[₦,\s]/g, "")) || 0;
          const itemTotal: number = numericPrice * item.quantity;
          return `${index + 1}. ${item.testName}
   Price: ₦${numericPrice.toLocaleString()}
   Quantity: ${item.quantity}
   Category: ${item.category || "N/A"}
   Type: ${item.type || "N/A"}
   Item Total: ₦${itemTotal.toLocaleString()}
   ${item.isScan ? "(Scan)" : "(Test)"}`;
        })
        .join("\n\n");

      const emailSubject: string = `New Order Submission - ${orderId}`;
      const emailBody: string = `NEW ORDER SUBMISSION
===================

Order ID: ${orderId}

CUSTOMER INFORMATION:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phoneNumber}
- Special Note: ${formData.specialNote || "N/A"}
- Order Date: ${new Date(timestamp).toLocaleString()}

ORDER ITEMS (${cartItems.length} items):
${itemsDetails}

ORDER TOTAL: ₦${total.toLocaleString()}

---
This order has been automatically saved to your Google Sheets database.
Next Steps: Please reach out to the customer to confirm order details and arrange payment/pickup.`;

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
        "Order email sent successfully via AWS SES:",
        sesResult.MessageId
      );

      return NextResponse.json<OrderApiResponse>({
        success: true,
        message:
          "Order submitted successfully! Our team will reach out to you shortly to finalize the details.",
        orderId: orderId,
        itemsProcessed: cartItems.length,
        emailSent: true,
        messageId: sesResult.MessageId,
      });
    } catch (sesError: unknown) {
      console.error("Error sending order email via AWS SES:", sesError);

      // Handle specific SES errors
      let emailErrorMessage = "Order email notification failed";

      if (sesError instanceof Error) {
        if (sesError.name === "MessageRejected") {
          emailErrorMessage = "Order email was rejected by SES";
        } else if (sesError.name === "MailFromDomainNotVerifiedException") {
          emailErrorMessage = "SES sender domain is not verified";
        } else if (sesError.name === "SendingPausedException") {
          emailErrorMessage = "SES email sending is currently paused";
        }

        console.error(`${emailErrorMessage}:`, sesError.message);
      }

      // Don't fail the entire request if email fails, since Google Sheets succeeded
      return NextResponse.json<OrderApiResponse>({
        success: true,
        message:
          "Order submitted successfully to Google Sheets! However, email notification failed.",
        orderId: orderId,
        itemsProcessed: cartItems.length,
        emailSent: false,
        emailError: emailErrorMessage,
      });
    }
  } catch (error: unknown) {
    console.error("Error submitting order:", error);

    return NextResponse.json<OrderApiResponse>(
      {
        success: false,
        message: "Failed to submit order. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
