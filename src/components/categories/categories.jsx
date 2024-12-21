"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "SAREE",
    image: "/saree.webp?height=400&width=400",
    link: "/category/vases",
  },
  {
    name: "LEHENGA",
    image: "/lehenga.webp?height=400&width=400",
    link: "/category/candles",
  },
  {
    name: "SUIT",
    image: "/suit.webp?height=400&width=400",
    link: "/category/ceramics",
  },
];

export function Categories() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div className="py-20">
      <div
        ref={elementRef}
        className={cn(
          "grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-white text-center">
                <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                <ArrowRight className="mx-auto h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
