"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";
import { BANNER } from "@/constants/products";

export function Hero() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation();

  const scrollToFeaturedProducts = useCallback(() => {
    const featuredProducts = document.getElementById("featured-products");
    if (featuredProducts) {
      featuredProducts.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen">
      <div
        ref={elementRef}
        className={cn(
          "absolute inset-0 transition-all duration-1000",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-150"
        )}
      >
        {BANNER[currentProduct].images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Hero image ${index}`}
            fill
            className={cn(
              "absolute inset-0 object-cover transition-opacity duration-1000",
              index === currentImage ? "opacity-100" : "opacity-0"
            )}
            priority={index === currentImage}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative h-full flex items-center justify-center text-center text-white">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold">
            PRODUCTS FOR THE SOUL
          </h1>
          <p className="text-xl md:text-2xl">
            Breathing new life into cultural craft
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
            onClick={scrollToFeaturedProducts}
          >
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}
