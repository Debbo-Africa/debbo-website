"use client";

import type React from "react";
import { useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { TestHeader } from "@/components/test-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { OrderSuccessModal } from "@/components/order-success-modal";
import Link from "next/link";
import { Toaster } from "@/components/toast";
import ButtonComponent from "@/components/Button";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const { toasts, toast, dismiss } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    specialNote: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<{
    cartItems: typeof cartItems;
    total: number;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const total = getCartTotal();
      const orderData = {
        cartItems,
        formData,
        total,
      };

      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        // Store order data before showing modal
        setSubmittedOrder({
          cartItems: [...cartItems],
          total: total,
        });

        // Show success toast
        toast({
          type: "success" as any,
          title: "Order Submitted Successfully!",
          description: result.message,
          duration: 6000,
        });

        // Show modal
        setShowSuccessModal(true);
      } else {
        toast({
          type: "error" as any,
          title: "Submission Failed",
          description: result.message || "Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        type: "error" as any,
        title: "Network Error",
        description:
          "Failed to submit order. Please check your connection and try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close properly for shadcn Dialog
  const handleModalClose = (open: boolean) => {
    if (!open) {
      setShowSuccessModal(false);
      setSubmittedOrder(null);
      // Clear cart and form when modal closes
      clearCart();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        specialNote: "",
      });
    }
  };

  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <TestHeader />
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-body-text-gray mb-8">
            Add some tests to get started
          </p>
          <ButtonComponent text="Browse Tests" linkTo="/individual"arrow={false} />
         
        </div>
        <Toaster toasts={toasts as any} onDismiss={dismiss} />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <TestHeader />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4 shadow-none border-2 border-[#fcf0e2] rounded-2xl md:rounded-3xl overflow-hidden">
              <h1 className="text-2xl font-bold mb-6 p-4">
                Cart ({cartItems.length})
              </h1>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-transparent  border-b-2 shadow-none border-[#fcf0e2] rounded-none"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs md:text-sm text-body-text-gray">
                          {item.category}
                        </p>
                        <h3 className="font-semibold">{item.testName}</h3>
                        {item.testCount && (
                          <p className="text-sm text-gray-500">
                            {item.testCount} {item.isScan ? "Scan" : "Test"}
                            {item.testCount > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <p className="font-bold">
                        &#8358;
                        {item.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-body-text-gray flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-full w-8 h-8 bg-[#0D0D0DFC] hover:bg-[#D9D0C6] text-white"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Button className="font-semibold bg-[#D9D0C6] text-general-black rounded-full hover:bg-[#D9D0C6] px-4">
                          {item.quantity}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-full w-8 h-8 bg-[#0D0D0DFC] hover:bg-[#D9D0C6] text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Card className="bg-transparent shadow-none border-2 border-[#fcf0e2] rounded-2xl md:rounded-3xl">
              <CardHeader>
                <h2 className="text-2xl font-bold ">Cart Summary</h2>
                <p className="text-sm text-gray-600">
                  Here's a summary of your cart. Please provide your details so
                  we can process your order.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Subtotal</span>
                  <span className="font-bold">₦{total.toLocaleString()}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                        disabled={isSubmitting}
                        className="bg-[--surface-card] border-none outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                        disabled={isSubmitting}
                        className="bg-[--surface-card] border-none outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        disabled={isSubmitting}
                        className="bg-[--surface-card] border-none outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <Input
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        disabled={isSubmitting}
                        className="bg-[--surface-card] border-none outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Special Note
                    </label>
                    <Textarea
                      name="specialNote"
                      value={formData.specialNote}
                      onChange={handleInputChange}
                      placeholder="Message"
                      rows={3}
                      disabled={isSubmitting}
                      className="bg-[--surface-card] border-none outline-none"
                    />
                  </div>

                
                  <ButtonComponent
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    text={
                      isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        
                        </>
                      ) : (
                        "Order Now "
                      )
                    }
                  />

                  <p className="text-xs text-gray-500 text-center">
                    By placing order you agree to the{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-orange-500 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    of DébboAfrica.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Toaster toasts={toasts as any} onDismiss={dismiss} />

      {submittedOrder && (
        <OrderSuccessModal
          isOpen={showSuccessModal}
          onOpenChange={handleModalClose}
          cartItems={submittedOrder.cartItems}
          total={submittedOrder.total}
        />
      )}
    </div>
  );
}
