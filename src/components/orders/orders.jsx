"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";
import axios from "axios";
import { PRODUCTS_DATA } from "@/constants/products";
import { useSession } from "next-auth/react";

export function Order() {
  const { elementRef, isVisible } = useScrollAnimation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (session?.user) {
          const response = await axios.get(
            `/api/orders/all?userId=${session.user.id}`
          );
          console.log("Fetched orders:", response.data);
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!orders?.length)
    return <div className="text-center py-8">No orders found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div
        ref={elementRef}
        className={cn(
          "space-y-8",
          mounted ? "opacity-100" : "opacity-0",
          isVisible && "animate-fade-up"
        )}
      >
        <h1 className="text-3xl font-bold">Your Orders</h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-6 space-y-4 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Order ID: {order._id}</p>
                <p className="text-gray-600">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">
                  Total Amount: ₹{order.totalAmount.toFixed(2)}
                </p>
                <p
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-sm",
                    order.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  )}
                >
                  {order.status}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => {
                const product = PRODUCTS_DATA[item.product];

                return (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
                  >
                    <div className="relative w-24 h-24">
                      <Image
                        src={product?.image || "/placeholder.svg"}
                        alt={product?.name || `Product ${item.product}`}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold">
                        {product?.name || `Product ID: ${item.product}`}
                      </h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">
                        Price per item: ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {order.shippingAddress && (
              <div className="mt-4 p-4 bg-white rounded-lg">
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.streetAddress}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
