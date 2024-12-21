"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

// Dummy data to simulate API response
const cartItems = [
  {
    id: 1,
    name: "Ceramic Vase Collection",
    price: 129,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Handcrafted Pottery Set",
    price: 89,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Artisan Candle Bundle",
    price: 59,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export function Cart() {
  const router = useRouter();
  const { elementRef, isVisible } = useScrollAnimation();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    router.push(
      `/protected/checkout?items=${JSON.stringify(selectedProducts)}`
    );
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
        <h1 className="text-3xl font-bold">Your Cart</h1>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
          >
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onCheckedChange={() => toggleItemSelection(item.id)}
            />
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-md"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">
            Total: ${getTotalPrice().toFixed(2)}
          </p>
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
