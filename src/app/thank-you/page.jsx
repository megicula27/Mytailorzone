import Link from "next/link";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your order has been successfully placed.
          </p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
