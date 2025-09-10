"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./productCard";
import { Category, Product, Images, Brand } from "@/generated/prisma";

// Novo tipo para produtos com imagens
type ProductWithImages = Product & { images: Images[]; brand: Brand };

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProduct = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category=${categorySlug}`);
      const data: ProductWithImages[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="flex flex-col items-start py-1 md:flex-row">
      {/* Sidebar de categorias */}
      <div className="flex flex-col border md:min-w-40">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item.slug)}
            key={item.id}
            className={`text-darkColor hover:bg-shop_light_green hoverEffect rounded-none border-0 border-b bg-transparent p-0 font-semibold capitalize shadow-none transition-colors last:border-b-0 hover:text-white ${
              item.slug === currentSlug &&
              "bg-shop_light_green border-shop_light_green text-white"
            }`}
          >
            <p className="w-full px-2 text-left">{item.title}</p>
          </Button>
        ))}
      </div>

      {/* Lista de produtos */}
      <div className="flex-1">
        {loading ? (
          <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-4">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="size-5 animate-spin" />
              <span>Carregando produtos ...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <AnimatePresence key={product.id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
