import Container from "@/components/Container";
import HomeBanner from "./_components/homeBanner";
import HomeCategories from "./_components/homeCategories";
import ProductGrid from "./_components/productGrid";
import ShopByBrand from "./_components/shopByBrand";

export default function Home() {
  return (
    <Container>
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        <HomeCategories />
        <ShopByBrand />
      </div>
    </Container>
  );
}
