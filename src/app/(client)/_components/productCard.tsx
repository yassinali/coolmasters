import { ProductWithRelations } from "@/app/hook/types";
import { SubTitle, Title } from "@/components/text";
import { Flame, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: ProductWithRelations }) => {
  const hasImage = product?.images && product.images.length > 0;
  const stock = product?.stock ?? 0;

  return (
    <div className="border-dark_blue/20 group rounded-md border-[1px] bg-white text-sm">
      <div className="group bg-shop_light_bg relative overflow-hidden">
        {hasImage && (
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.images[0].imagesUrl}
              alt={product.name || "Produto"}
              loading="lazy"
              width={700}
              height={700}
              className={`bg-shop_light_bg h-64 w-full overflow-hidden object-contain transition-transform duration-500 ${stock > 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}

        {product?.status === "sale" && (
          <p className="border-darkColor/50 group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect absolute top-2 left-2 z-10 rounded-full border px-2 text-xs">
            Sale!
          </p>
        )}

        {product?.status === "new" && (
          <p className="border-darkColor/50 group-hover:border-shop_light_green group-hover:text-shop_light_green hoverEffect absolute top-2 left-2 z-10 rounded-full border px-2 text-xs">
            Novos
          </p>
        )}

        {product?.status === "hot" && (
          <Link
            href={"/novidades"}
            className="border-b-shop_orange/50 group-hover:border-shop_orange group-hover:text-shop_orange hoverEffect absolute top-2 left-2 z-10 rounded-full border p-1"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop_orange/50 group-hover:text-shop_orange hoverEffect"
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3">
        <SubTitle className="text-muted-foreground text-xs uppercase">
          {product.brand ? product.brand.title : "Sem Marca"}
        </SubTitle>
        <Title className="line-clamp-2 text-sm">{product.name}</Title>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star
                size={12}
                key={index}
                className={
                  index < 4 ? "text-shop_light_green" : "text-shop_lighter_text"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-shop_light_text text-xs tracking-wide">
            5 Reviews
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${stock === 0 ? "text-red-600" : "text-shop_light_green/80 font-semibold"}`}
          >
            {stock > 0 ? stock : "Indisponível"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
