import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { FeaturedProducts } from "@/components/featured-products/featured-products";
import { Categories } from "@/components/categories/categories";
import { Features } from "@/components/features/features";
import { FAQ } from "@/components/faq/faq";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}
