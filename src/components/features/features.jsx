"use client";

import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "EXCLUSIVE DESIGN",
    description:
      "These are authentic works of art created by masters of their craft. Elite tableware differs from the usual in its impeccable execution, premium materials, stylish design that goes beyond fashion and trends.",
  },
  {
    title: "HANDMADE WORK",
    description:
      "This is a work done at the highest level, an original author's idea, implemented using high-quality professional materials, by a specific person - the author of this idea. As a rule, such a product exists in a single copy.",
  },
  {
    title: "CAREFUL DELIVERY",
    description:
      "We will pack and transport your goods efficiently, and if necessary, the courier will deliver it to the entrance and lift it by elevator to the desired floor. You have nothing to worry about.",
  },
];

export function Features() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div className="py-20">
      <div
        ref={elementRef}
        className={cn(
          "max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
