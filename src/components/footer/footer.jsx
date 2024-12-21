"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useScrollAnimation } from "@/utils/animation";
import { cn } from "@/lib/utils";

export function Footer() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Newsletter */}
        <div
          ref={elementRef}
          className={cn(
            "relative mb-20 transition-all duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          )}
        >
          <div className="absolute inset-0">
            <Image
              src="/footer.jpg?height=600&width=1200"
              alt="Newsletter background"
              fill
              className="object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative text-center text-white py-20">
            <h2 className="text-4xl font-bold mb-4">
              EXCLUSIVE NEWS & CONTENT
            </h2>
            <p className="text-gray-200 mb-8">
              Subscribe to our newsletter to keep up to date with all the events
              of the service
            </p>
            <form className="max-w-md mx-auto flex gap-2 px-4">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white"
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-white/90"
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">SERVICE</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/story">Our story</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/press">Press</Link>
              </li>
              <li>
                <Link href="/partners">Partners</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/claim">Claim</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">LANGUAGE & CURRENCY</h3>
            <select className="w-full p-2 border rounded mb-2">
              <option>English</option>
            </select>
            <select className="w-full p-2 border rounded">
              <option>INDIAN RUPEES ₹</option>
            </select>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t">
          <p className="text-sm text-gray-600">
            © 2024 ADITYA VIKRAM SINGH, Inc. All rights reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
