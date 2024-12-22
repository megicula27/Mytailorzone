"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { PRODUCTS_ITEMS } from "@/constants/products";
import { useCart } from "@/context/cart/cartContext";
// Dummy product data

export function ProductPage({ productId }) {
  const router = useRouter();
  const product =
    PRODUCTS_ITEMS.find((p) => p.id == productId) || PRODUCTS_ITEMS[0];
  const [quantity, setQuantity] = useState(1);
  const { setSelectedProducts } = useCart();
  const { data: session } = useSession();
  const [mainImage, setMainImage] = useState(product.images[0]);
  const { elementRef: imageRef, isVisible: imageVisible } =
    useScrollAnimation();
  const { elementRef: detailsRef, isVisible: detailsVisible } =
    useScrollAnimation();
  const { elementRef: reviewsRef, isVisible: reviewsVisible } =
    useScrollAnimation();
  const { elementRef: similarRef, isVisible: similarVisible } =
    useScrollAnimation();

  const similarProducts = PRODUCTS_ITEMS.filter((p) => p.id !== product.id);
  const handleAddToCart = async (productId, quantity = 1) => {
    // Check if the user is logged in
    if (!session?.user?.id) {
      toast.error("You need to log in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post("/api/cart/add", {
        userId: session.user.id, // Pass user ID in the body
        productId,
        quantity,
      });

      if (response.status === 200) {
        toast.success("Item added to cart!");
      } else {
        toast.error(response.data.error || "Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding the item to the cart.");
    }
  };
  const handleBuyNow = () => {
    if (!session?.user?.id) {
      toast.error("You need to log in to proceed.");

      return;
    }

    const newCartItem = {
      id: product.id, // Use the product UID
      name: product.name || "Unknown Product",
      price: product.price || 0,
      quantity,
      image: product.images[0] || "", // Use a placeholder if the image is missing
    };

    // Add the new product to the cart
    setSelectedProducts((prevProducts) => [...prevProducts, newCartItem]);

    // Redirect to the checkout page
    router.push("/protected/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div
            ref={imageRef}
            className={cn(
              "space-y-4 transition-all duration-1000",
              imageVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            )}
          >
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div
            ref={detailsRef}
            className={cn(
              "space-y-6 transition-all duration-1000",
              detailsVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            )}
          >
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="text-gray-600">
                ({product.rating.toFixed(1)})
              </span>
            </div>
            <p className="text-2xl font-bold">₹{product.price}</p>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-xl font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>

              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleAddToCart(productId, quantity)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div
          ref={reviewsRef}
          className={cn(
            "mt-16 transition-all duration-1000",
            reviewsVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          )}
        >
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{review.author}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>

        {/* Similar PRODUCTS_ITEMS */}
        <div
          ref={similarRef}
          className={cn(
            "mt-16 transition-all duration-1000",
            similarVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-20 opacity-0"
          )}
        >
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {similarProducts.map((similarProduct) => (
              <Link
                key={similarProduct.id}
                href={`/product/${similarProduct.id}`}
                className="group"
              >
                <div className="aspect-square relative overflow-hidden mb-4">
                  <Image
                    src={similarProduct.images[0]}
                    alt={similarProduct.name}
                    fill
                    className="w-auto object-contain transition-transform duration-300 group-hover:scale-110 rounded-full"
                  />
                </div>
                <h3 className="font-semibold mb-2">{similarProduct.name}</h3>
                <p className="text-gray-600">₹{similarProduct.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
