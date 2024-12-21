"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Dummy product data

const products = [
  {
    id: 1,
    name: "Peachy Bloom Cotton Suit Set",
    description:
      "Elevate your home decor with our exquisite Ceramic Vase Collection. Each piece is handcrafted by skilled artisans, featuring unique textures and elegant designs that blend seamlessly with any interior style.",

    price: 1099,
    images: [
      "/product_1_0.webp?height=400&width=400",
      "/product_1_1.webp?height=400&width=400",
      "/product_1_2.webp?height=400&width=400",
    ],
    rating: 4.5,
    reviews: [
      {
        id: 1,
        author: "Jane Doe",
        rating: 5,
        comment: "Absolutely beautiful! The craftsmanship is outstanding.",
      },
      {
        id: 2,
        author: "John Smith",
        rating: 4,
        comment: "Great quality, but shipping took longer than expected.",
      },
      {
        id: 3,
        author: "Emily Brown",
        rating: 5,
        comment:
          "These vases are stunning. They've completely transformed my living room.",
      },
    ],
  },
  {
    id: 2,
    name: "Shimmer Orange Sharara Suit Set",
    price: 899,
    description:
      "Our Handcrafted Pottery Set brings rustic charm to your dining experience. Each piece is uniquely shaped and glazed, creating a one-of-a-kind set that's both functional and decorative.",

    images: [
      "/product_2_0.webp?height=400&width=400",
      "/product_2_1.webp?height=400&width=400",
      "/product_2_2.webp?height=400&width=400",
    ],
    rating: 4.2,
    reviews: [],
  },
  {
    id: 3,
    name: "Scarlet Red Ruffle Saree",
    price: 1299,
    description:
      "Indulge your senses with our Artisan Candle Bundle. Featuring a variety of hand-poured soy candles in exquisite scents, this set creates a warm and inviting atmosphere in any room.",

    images: [
      "/product_3_0.webp?height=300&width=400",
      "/product_3_1.webp?height=400&width=400",
      "/product_3_2.webp?height=400&width=400",
    ],
    rating: 4.8,
    reviews: [],
  },
];

export function ProductPage({ productId }) {
  const router = useRouter();
  const product = products.find((p) => p.id === productId) || products[0];
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);
  const { elementRef: imageRef, isVisible: imageVisible } =
    useScrollAnimation();
  const { elementRef: detailsRef, isVisible: detailsVisible } =
    useScrollAnimation();
  const { elementRef: reviewsRef, isVisible: reviewsVisible } =
    useScrollAnimation();
  const { elementRef: similarRef, isVisible: similarVisible } =
    useScrollAnimation();

  const similarProducts = products.filter((p) => p.id !== product.id);

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
              <Button
                className="flex-1"
                onClick={() => router.push("/protected/checkout")}
              >
                Buy Now
              </Button>
              <Button variant="outline" className="flex-1">
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

        {/* Similar Products */}
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
