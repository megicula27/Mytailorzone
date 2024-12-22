import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/cart/cartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MY TAILOR ZONE",
  description: "Created by Aditya Vikram Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
