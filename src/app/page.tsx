import Container from "@/components/Container";
import HomeBanner from "./(client)/_components/homeBanner";
import ProductGrid from "./(client)/_components/productGrid";

export default function Home() {
  return (
    <Container>
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        {/* <HomeCategory categories={categories}/>
       <ShopByBrand/> */}
      </div>
    </Container>
  );
}
