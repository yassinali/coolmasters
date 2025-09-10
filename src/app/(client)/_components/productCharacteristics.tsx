import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/generated/prisma/client";

import React from "react";

interface ProductWithRelations extends Product {
  brand?: {
    title: string | null;
  } | null;
  categories: { title: string }[];
}

const ProductCharacteristics = ({
  product,
}: {
  product: ProductWithRelations;
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{product.name}: Características</AccordionTrigger>
        <AccordionContent>
          <p className="flex items-center justify-between">
            Marca:{" "}
            <span className="font-semibold tracking-wide">
              {product.brand?.title ?? "Sem marca"}
            </span>
          </p>

          <p className="flex items-center justify-between">
            Collection:{" "}
            <span className="font-semibold tracking-wide">2025</span>
          </p>

          <p className="flex items-center justify-between">
            Categoria:{" "}
            <span className="font-semibold tracking-wide">
              {product.categories.length > 0
                ? product.categories.map((c) => c.title).join(", ")
                : "Sem categoria"}
            </span>
          </p>

          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="font-semibold tracking-wide">
              {product.stock && product.stock > 0
                ? "Disponível"
                : "Indisponível"}
            </span>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
