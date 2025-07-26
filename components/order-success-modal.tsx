"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { CartItem } from "@/hooks/use-cart";
import Link from "next/link";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  total: number;
}

export function OrderSuccessModal({
  isOpen,
  onOpenChange,
  cartItems,
  total,
}: OrderSuccessModalProps) {
  const formatPrice = (price: string) => {
    const numericPrice = Number.parseFloat(price.replace(/[₦,\s]/g, "")) || 0;
    return `₦${numericPrice.toLocaleString()}`;
  };

  const calculateItemTotal = (item: CartItem) => {
    const numericPrice =
      Number.parseFloat(item.price.replace(/[₦,\s]/g, "")) || 0;
    return numericPrice * item.quantity;
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto bg-[--surface-card] border-none p-8 rounded-3xl h-[80%] md:h-[90%] flex flex-col z-[99999]">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">
            Thank you for your order
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We've received your order! Our team will reach out to you shortly to
            finalize the details. An order confirmation email has been sent to
            your email address.
          </p>
        </div>

        <div
          className="space-y-6 mb-8 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cartItems.map((item) => (
            <div key={item.id} className="space-y-2">
              {item.category && (
                <div className="text-xs text-gray-500 uppercase tracking-wide bg-[#F2E9DD] w-fit p-1 rounded-full">
                  {item.category}
                </div>
              )}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-black">
                    {item.testName}{" "}
                    <span className="font-light text-sm">
                      X {item.quantity}
                    </span>{" "}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {item.testCount && (
                      <p>
                        {item.testCount} {item.isScan ? "Scan" : "Test"}
                        {item.testCount > 1 ? "s" : ""}
                      </p>
                    )}
                    <p>Unit Price: {formatPrice(item.price)}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-black">
                    ₦{calculateItemTotal(item).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className=" text-lg bg-general-black">Total</span>
              <span className=" text-lg bg-general-black ">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Link href="/individual" className="mt-auto flex justify-center">
          <Button
            onClick={handleClose}
            className="w-fit mx-auto bg-[#FFF8F0] text-general-black rounded-full py-3 hover:bg-[#FFF8F0]"
          >
            Back to Book a Test
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
