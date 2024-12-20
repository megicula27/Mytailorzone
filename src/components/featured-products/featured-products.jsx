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
    name: "Ceramic Vase Collection",
    price: 129,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 2,
    name: "Handcrafted Pottery Set",
    price: 89,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
  },
  {
    id: 3,
    name: "Artisan Candle Bundle",
    price: 59,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
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
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold mb-4">${product.price}</p>
              </Link>
              <Button className="w-full">Add to Cart</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
