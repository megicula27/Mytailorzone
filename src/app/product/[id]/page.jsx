import { Navbar } from "@/components/navbar/navbar";
import { ProductPage } from "@/components/product-page/product-page";
import { Footer } from "@/components/footer/footer";

export default async function Product({ params }) {
  const { id } = await params;
  const productId = parseInt(id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <ProductPage productId={productId} />
      </main>
      <Footer />
    </div>
  );
}
