import { Navbar } from "@/components/navbar/navbar";
import { Checkout } from "@/components/checkout/checkout";
import { Footer } from "@/components/footer/footer";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col mt-8">
      <Navbar />
      <main className="flex-grow">
        <Checkout />
      </main>
      <Footer />
    </div>
  );
}
