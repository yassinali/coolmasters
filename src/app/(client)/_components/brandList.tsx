import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Title } from "@/components/text";
import React from "react";

interface Brand {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}

interface Props {
  brands: Brand[];
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Marcas</Title>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand) => (
          <div
            key={brand?.id}
            onClick={() => setSelectedBrand(brand?.slug as string)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={brand?.slug as string}
              id={brand?.slug}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug}
              className={`${selectedBrand === brand?.slug ? "text-shop_dark_green font-semibold" : "font-normal"} cursor-pointer`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
        {selectedBrand && (
          <button
            onClick={() => setSelectedBrand(null)}
            className="hover:text-shop_dark_green hoverEffect mt-2 text-left text-sm font-medium underline decoration-[1px] underline-offset-2"
          >
            Redefinir filtros
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
