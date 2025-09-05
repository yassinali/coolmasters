"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./productCard";
import HomeTabBar from "@/components/homeTabBar";
import { Product as PrismaProduct, Images, Category } from "@/generated/prisma";

// Define a tipagem correta para o produto, incluindo a relação com Images
type ProductWithImages = PrismaProduct & {
  images: Images[];
};

const ProductGrid = () => {
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Efeito para carregar as categorias na montagem do componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categoria");
        const data: Category[] = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategoryId(data[0].id);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Efeito para carregar os produtos sempre que a categoria selecionada mudar
  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchProductsByCategory = async () => {
      setLoadingProducts(true);
      try {
        const response = await fetch(
          `/api/products-by-category?categoryId=${selectedCategoryId}`,
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        const data: ProductWithImages[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProductsByCategory();
  }, [selectedCategoryId]);

  if (loadingCategories) {
    return (
      <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-10">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="size-5 animate-spin" />
          <span>Loading categories...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HomeTabBar
        categories={categories}
        selectedTab={selectedCategoryId}
        onTabSelect={setSelectedCategoryId}
      />
      {loadingProducts ? (
        <div className="mt-10 flex min-h-80 w-full flex-col items-center justify-center gap-4 bg-gray-100 py-10">
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="size-5 animate-spin" />
            <span>Product is loading...</span>
          </div>
        </div>
      ) : products?.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product) => (
            <AnimatePresence key={product.id}>
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
        <NoProductAvailable selectedTab={selectedCategoryId} />
      )}
    </div>
  );
};

export default ProductGrid;
