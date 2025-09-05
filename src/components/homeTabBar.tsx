import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

// interface Props {
//   selectedTab: string;
//   onTabSelect: (tab: string) => void;
// }

const HomeTabBar = async () =>
  // { selectedTab, onTabSelect }: Props

  {
    const tabCategorias = await prisma.category.findMany({
      take: 4,
      skip: 0,
      select: { id: true, title: true, slug: true },
    });
    return (
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-3 text-sm font-semibold">
          {tabCategorias.map((item) => (
            <button
              key={item.title}
              // onClick={() => onTabSelect(item.title)}
              className={`border-shop_light_green/30 hover:bg-shop_light_green hover:border-shop_light_green hoverEffect rounded-full border px-4 py-1.5 md:px-6 md:py-2`}
            >
              {item.title}
            </button>
          ))}
        </div>
        <Link
          href={"/shop#"}
          className={`border-shop_light_green/30 hover:bg-shop_light_green hover:border-shop_light_green hoverEffect rounded-full border px-4 py-1.5 md:px-6 md:py-2`}
        >
          Todos
        </Link>
      </div>
    );
  };

export default HomeTabBar;
