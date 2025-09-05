import HomeTabBar from "@/components/homeTabBar";
import prisma from "@/lib/prisma";

// import ProductCard from "./productCard";
// import { Product } from "@/sanity.types";

const ProductGrid = () => {
  //   const [products, setProducts] = useState<Product[]>([]);
  //   const [loading, setLoading] = useState(false);
  //   const [selectedTab, setSelectedTab] = useState(productType[0].title || "");
  //   const query = `*[_type == "product" && variant == $variant] | order(name asc){
  //   ...,"categories": categories[]->title
  // }`;

  //   const params = { variant: selectedTab.toLowerCase() };
  //   useEffect(() => {
  //     const fecthData = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await client.fetch(query, params);
  //         console.log("Products:", response);
  //         setProducts(response);
  //       } catch (error) {
  //         console.log("Error fetching products:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fecthData();
  //   }, [selectedTab]);
  return (
    <div>
      <HomeTabBar
      //   selectedTab={selectedTab} onTabSelect={setSelectedTab}
      />
      {/* {loading ? (
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-10">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="size-5 animate-spin" />
            <span>Product is loading...</span>
          </div>
        </div>
      ) : products?.length ? (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductCard product={product} />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )} */}
    </div>
  );
};

export default ProductGrid;
