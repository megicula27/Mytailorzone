"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Peachy Bloom Cotton Suit Set",
    price: 1099,
    images: [
      "/product_1_0.webp?height=400&width=400",
      "/product_1_1.webp?height=400&width=400",
      "/product_1_2.webp?height=400&width=400",
    ],
  },
  {
    id: 2,
    name: "Shimmer Orange Sharara Suit Set",
    price: 899,
    images: [
      "/product_2_0.webp?height=400&width=400",
      "/product_2_1.webp?height=400&width=400",
      "/product_2_2.webp?height=400&width=400",
    ],
  },
  {
    id: 3,
    name: "Scarlet Red Ruffle Saree",
    price: 1299,
    images: [
      "/product_3_0.webp?height=300&width=400",
      "/product_3_1.webp?height=400&width=400",
      "/product_3_2.webp?height=400&width=400",
    ],
  },
];

export function FeaturedProducts() {
  const { elementRef, isVisible } = useScrollAnimation();
  const [activeImage, setActiveImage] = useState({});

  return (
    <div className="py-20 bg-gray-50">
      <div
        ref={elementRef}
        className={cn(
          "max-w-7xl mx-auto px-4 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => {
                let currentImage = 0;
                const interval = setInterval(() => {
                  currentImage = (currentImage + 1) % 3;
                  setActiveImage((prev) => ({
                    ...prev,
                    [product.id]: currentImage,
                  }));
                }, 1000);
                // @ts-ignore
                window[`interval_${product.id}`] = interval;
              }}
              onMouseLeave={() => {
                // @ts-ignore
                clearInterval(window[`interval_${product.id}`]);
                setActiveImage((prev) => ({ ...prev, [product.id]: 0 }));
              }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.images[activeImage[product.id] || 0]}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-contain w-auto h-full transition-transform duration-500 group-hover:scale-110 rounded-2xl"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold mb-4">₹{product.price}</p>
              </Link>
              <Button className="w-full">Add to Cart</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
