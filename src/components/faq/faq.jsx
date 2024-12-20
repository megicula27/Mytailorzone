"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How to place an order in an online store?",
    answer:
      "Choose a product on our website. Add it to the cart. Specify your details, method and address of delivery. Pay for the order (the final price will be indicated on the payment page). Specify the delivery method.",
  },
  {
    question: "How much does the delivery cost?",
    answer:
      "Delivery costs vary depending on your location and chosen shipping method. You can view exact shipping costs at checkout.",
  },
  {
    question: "What are the delivery methods?",
    answer:
      "We offer standard shipping, express delivery, and local pickup options. Delivery times and costs vary by method and location.",
  },
  {
    question: "How to use the bonus card?",
    answer:
      "Enter your bonus card number during checkout to apply any available discounts or rewards to your purchase.",
  },
];

export function FAQ() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div className="py-20 bg-gray-50">
      <div
        ref={elementRef}
        className={cn(
          "max-w-3xl mx-auto px-4 transition-all duration-1000",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
      >
        <h2 className="text-4xl font-bold text-center mb-12">FAQ</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
