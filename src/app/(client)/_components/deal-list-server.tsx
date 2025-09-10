// src/app/(client)/_components/deal-list-server.tsx
import prisma from "@/lib/prisma";
import ProductCard from "../_components/productCard";
import { Product as PrismaProduct, Images, Brand } from "@/generated/prisma";

// Cria um novo tipo que combina o tipo Product do Prisma com o array de Images
type ProductWithImages = PrismaProduct & {
  images: Images[];
  brand: Brand | null;
};

const DealListServer = async () => {
  const products: ProductWithImages[] = await prisma.product.findMany({
    where: {
      status: "new",
    },
    orderBy: { id: "desc" },
    // You'll likely need to `include` images here to get the data
    include: {
      images: true,
      brand: true,
    },
  });

  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default DealListServer;
