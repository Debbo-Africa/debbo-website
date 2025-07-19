"use client";

import type React from "react";

import { useState } from "react";
import { Breadcrumb } from "@/components/breadcrumb";
import { TestHeader } from "@/components/test-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    specialNote: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { cartItems, formData });
    alert("Order submitted successfully!");
    clearCart();
  };

  const formatPrice = (price: string) => {
    return price.replace(/[^\d]/g, "");
  };

  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <TestHeader />
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some tests to get started</p>
          <Link href="/individual">
            <Button>Browse Tests</Button>
          </Link>
        </div>
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
            <h1 className="text-2xl font-bold mb-6">
              Cart ({cartItems.length})
            </h1>

            <div className="space-y-4 shadow-sm">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="bg-transparent border-none  border-b-2 shadow-none"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs md:text-sm text-body-text-gray">{item.category}</p>
                        <h3 className="font-semibold">{item.testName}</h3>
                        {item.testCount && (
                          <p className="text-sm text-gray-500">
                            {item.testCount} Test{item.testCount > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <p className="font-bold">{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-body-text-gray  flex items-center gap-1 text-sm"
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
                          className="rounded-full w-8 h-8 bg-[#0D0D0DFC] hover:bg-[#0D0D0DFC] text-white  hover:bg-[#D9D0C6]"
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
                          className="rounded-full w-8 h-8 bg-[#0D0D0DFC] hover:bg-[#0D0D0DFC] hover:bg-[#D9D0C6] text-white"
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
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle>Cart Summary</CardTitle>
                <p className="text-sm text-gray-600">
                  Here's a summary of your cart. Please provide your details so
                  we can process your order.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                        className="bg-[--surface-card] border-none outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                      className="bg-[--surface-card] border-none outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-yellow hover:bg-yellow"
                  >
                    Order Now →
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By placing order you agree to the{" "}
                    <Link
                      href="/terms"
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
    </div>
  );
}
