import { Navbar } from "@/components/navbar/navbar";
import { Order } from "@/components/orders/orders";
import { Footer } from "@/components/footer/footer";

export default function OrderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Order />
      </main>
      <Footer />
    </div>
  );
}
