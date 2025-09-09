import { Title } from "@/components/text";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import React from "react";
interface Category {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}
const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Categorias</Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => setSelectedCategory(category?.slug as string)}
          >
            <RadioGroupItem
              value={category.slug as string}
              id={category.slug}
              className="rounded-sm"
            />
            <Label
              htmlFor={category?.slug}
              className={`${selectedCategory === category?.slug ? "text-shop_dark_green font-semibold" : "font-normal"} cursor-pointer`}
            >
              {category.title}
            </Label>
          </div>
        ))}
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="hover:text-shop_dark_green hoverEffect mt-2 text-left text-sm font-medium underline decoration-[1px] underline-offset-2"
          >
            Redefinir filtros
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default CategoryList;
