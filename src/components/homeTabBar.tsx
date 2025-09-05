import Link from "next/link";
import React from "react";

// Adicionando a interface Category para tipar corretamente os dados
interface Category {
  id: string;
  title: string | null;
}

// A interface Props agora espera um array de Categories
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
  categories: Category[];
}

const HomeTabBar = ({ selectedTab, onTabSelect, categories }: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {categories.map((category) => (
          <button
            key={category.id} // Usa o ID como chave, que é mais confiável que o título
            onClick={() => onTabSelect(category.id)} // Passa o ID da categoria para a função de seleção
            className={`border-shop_light_green/30 hover:bg-shop_light_green hover:border-shop_light_green hoverEffect rounded-full border px-4 py-1.5 md:px-6 md:py-2 ${
              selectedTab === category.id
                ? "bg-shop_light_green border-shop_light_green text-white"
                : "bg-shop_light_green/20"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
      <Link
        href={"/comprar"}
        className={`border-shop_light_green/30 hover:bg-shop_light_green hover:border-shop_light_green hoverEffect rounded-full border px-4 py-1.5 md:px-6 md:py-2`}
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabBar;
