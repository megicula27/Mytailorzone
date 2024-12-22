"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart/cartContext";
import { dummyProducts } from "@/constants/products";

export function Cart() {
  const router = useRouter();
  const { elementRef, isVisible } = useScrollAnimation();
  const [cartItems, setCartItems] = useState([]); // State to hold fetched cart items
  const [selectedItems, setSelectedItems] = useState([]);
  const { setSelectedProducts } = useCart();
  const { data: session } = useSession();
  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!session) {
        console.log("No session found. Skipping fetchCartItems.");
        return;
      }

      try {
        const response = await axios.get("/api/cart/all", {
          headers: {
            "user-id": session.user.id, // Pass the user ID from the session in the header
          },
        });

        const data = response.data;
        console.log(data);

        // Map the fetched data to match the required structure
        const formattedItems = data.items.map((item) => {
          const dummyProduct = dummyProducts.find(
            (product) => product.id == item.uid
          );
          return {
            id: item.uid, // Use the product UID
            name: dummyProduct?.name || "Unknown Product",
            price: dummyProduct?.price || 0,
            quantity: item.quantity,
            image: dummyProduct?.image || "", // Use a placeholder if the image is missing
          };
        });
        // console.log(formattedItems);

        setCartItems(formattedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [session]);

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

    setSelectedProducts(selectedProducts);
    router.push("/protected/checkout");
  };
  const handleRemoveFromCart = async (id) => {
    if (!session) {
      toast.error("You must be logged in to remove items from the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/cart/remove",
        { itemId: id },
        {
          headers: {
            "user-id": session.user.id,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Item removed from cart.");
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("An error occurred. Please try again.");
    }
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

        {cartItems.length === 0 ? (
          <p>Your cart is as empty as my robot heart! 🤖</p>
        ) : (
          cartItems.map((item) => (
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
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                variant="destructive"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))
        )}

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">
            Total: ₹{getTotalPrice().toFixed(2)}
          </p>
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}
