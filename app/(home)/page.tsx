import Banner from "@/components/Banner";
import ProductGrid from "@/components/ProductGrid";
import CategoryGrid from "@/components/CategoryGrid";
import { getLatestProducts, getProductsByCategory } from "@/queries/queries";

export const revalidate = 0;
const HomePage = async () => {
  const [nyheter, frukt, dryck, kott] = await Promise.all([
    getLatestProducts(),
    getProductsByCategory("Frukt"),
    getProductsByCategory("Dryck"),
    getProductsByCategory("Kött"),
  ]);

  return (
    <div className="py-12  mx-auto max-w-7xl sm:px-6 lg:px-8">
      <Banner />
      <div className="my-16">
        <CategoryGrid />
        <ProductGrid product={nyheter} title="Veckans Nyheter" />
        <ProductGrid product={frukt} title="Frukt och Grönt" />
        <ProductGrid product={dryck} title="Törstsläckare" />
        <ProductGrid product={kott} title="Kött och Fisk" />
      </div>
    </div>
  );
};

export default HomePage;
