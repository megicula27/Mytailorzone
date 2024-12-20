"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

// Dummy product data (you would typically fetch this from an API or state management)
const product = {
  id: 1,
  name: "Ceramic Vase Collection",
  price: 129,
  quantity: 1,
  image: "/placeholder.svg?height=100&width=100",
};

export function Checkout() {
  const router = useRouter();
  const { elementRef, isVisible } = useScrollAnimation();
  const [address, setAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const subtotal = product.price * product.quantity;
  const deliveryCharge = subtotal < 50 ? 10 : 0;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically process the order
    // For now, we'll just redirect to the thank you page
    router.push("/thank-you");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        ref={elementRef}
        className={cn(
          "space-y-8 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        <h1 className="text-3xl font-bold">Checkout</h1>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex items-center space-x-4">
            <Image
              src={product.image}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>${deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Address</h2>
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={address.streetAddress}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleInputChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={address.state}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={address.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
}
