"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/Container";
import { Title } from "@/components/text";
import { Product as PrismaProduct, Images } from "@/generated/prisma";
import NoProductAvailable from "./NoProductAvailable";
import { Loader2 } from "lucide-react";
import CategoryList from "./categoryList";
import BrandList from "./brandList";
import ProductCard from "./productCard";

// Cria um novo tipo que combina o tipo Product do Prisma com o array de Images
type ProductWithImages = PrismaProduct & {
  images: Images[];
};

interface Category {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

interface Brand {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
}

interface ShopProps {
  categories: Category[];
  brands: Brand[];
}

const Shop: React.FC<ShopProps> = ({ categories, brands }) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  // Altera o estado para usar o novo tipo
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null,
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?category=${selectedCategory || ""}&brand=${selectedBrand || ""}`,
        );
        if (!res.ok) throw new Error("Erro ao buscar produtos");
        // Converte a resposta para o novo tipo
        const data: ProductWithImages[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedBrand]);

  return (
    <Container className="mt-5 border-t">
      <div className="sticky top-0 z-10 mb-5">
        <div className="flex items-center justify-between">
          <Title className="text-lg tracking-wide uppercase">
            Produtos à sua medida
          </Title>
          {(selectedCategory || selectedBrand) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedBrand(null);
              }}
              className="text-shop_dark_green hover:text-darkRed hoverEffect mt-2 text-sm font-medium underline"
            >
              Redefinir filtros
            </button>
          )}
        </div>
      </div>

      <div className="border-t-shop_dark_green/50 flex flex-col gap-5 border-t md:flex-row">
        <div className="border-r-shop_btn_dark_green/50 scrollbar-hide pb-5 md:sticky md:top-20 md:h-[calc(100vh-160px)] md:min-w-64 md:self-start md:overflow-y-auto md:border-r">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BrandList
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </div>

        <div className="flex-1 pt-5">
          <div className="scrollbar-hide h-[calc(100vh-160px)] overflow-y-auto pr-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 bg-white p-20">
                <Loader2 className="text-shop_dark_green h-10 w-10 animate-spin" />
                <p className="text-base font-semibold tracking-wide">
                  Carregando os produtos...
                </p>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <div key={product.id} className="border p-2">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <NoProductAvailable className="mt-0 bg-white" />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Shop;
