"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Ceramic Vase",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  // Add more products here
];

export function Hero() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % 3);
    }, 3000);
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
        <Image
          src={products[currentProduct].images[currentImage]}
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
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
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Shop now
          </Button>
        </div>
      </div>
    </div>
  );
}
