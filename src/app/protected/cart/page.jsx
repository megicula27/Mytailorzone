import { Navbar } from "@/components/navbar/navbar";
import { Cart } from "@/components/cart/cart";
import { Footer } from "@/components/footer/footer";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col mt-8">
      <Navbar />
      <main className="flex-grow">
        <Cart />
      </main>
      <Footer />
    </div>
  );
}
