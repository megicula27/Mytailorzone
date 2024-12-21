"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Heart } from "lucide-react";
import { useScrollPosition } from "@/utils/animation";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrollPosition();
  const { data: session } = useSession();

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-300">
              My Tailor Zone
            </Link>
          </div>

          {scrolled ? (
            <>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-md">
                  <div className="px-4 py-2 space-y-2">
                    <Link href="/collection" className="block py-2">
                      Collection
                    </Link>
                    <Link href="/shop" className="block py-2">
                      Shop
                    </Link>
                    <Link href="/about" className="block py-2">
                      About
                    </Link>
                    <Link href="/protected/wishlist" className="block py-2">
                      Wishlist
                    </Link>
                    {session ? (
                      <button
                        onClick={() => signOut()}
                        className="block py-2 w-full text-left"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        onClick={() => signIn()}
                        className="block py-2 w-full text-left"
                      >
                        Login
                      </button>
                    )}
                    <Link href="/protected/cart" className="block py-2">
                      Cart
                    </Link>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center space-x-8">
                <Link
                  href="/collection"
                  className="text-gray-300 hover:text-gray-200"
                >
                  Collection
                </Link>
                <Link
                  href="/shop"
                  className="text-gray-300 hover:text-gray-200"
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-gray-200"
                >
                  About
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/protected/wishlist"
                  className="text-gray-300 hover:text-gray-200"
                >
                  <Heart className="h-6 w-6 text-gray-300" />
                </Link>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="text-gray-300 hover:text-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => signIn()}
                    className="text-gray-300 hover:text-gray-200"
                  >
                    Login
                  </button>
                )}
                <Link
                  href="/protected/cart"
                  className="text-gray-300 hover:text-gray-200"
                >
                  <ShoppingBag className="h-6 w-6 text-gray-300" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
