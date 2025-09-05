import Container from "@/components/Container";
import HomeBanner from "./(client)/_components/homeBanner";
import ProductGrid from "./(client)/_components/productGrid";
import ShopByBrand from "./(client)/_components/shopByBrand";
import HomeCategories from "./(client)/_components/homeCategories";

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
