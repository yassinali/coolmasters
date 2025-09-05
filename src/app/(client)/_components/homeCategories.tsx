import { Title } from "@/components/text";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomeCategories = async () => {
  const placeholder =
    "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhmlskf5VdOjWVx2cfgqaZoF4byvOwN8tMzp7lQR";

  const categories = await prisma.category.findMany({
    take: 6,
    orderBy: { id: "asc" },
    select: { id: true, title: true, slug: true, imageUrl: true },
  });

  return (
    <div className="border-shop_light_green/20 my-10 rounded-md border bg-white p-5 md:my-20 lg:p-7">
      <Title className="border-b pb-3">Categorias Populares</Title>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-shop_light_bg group flex items-center gap-3 p-5"
          >
            {category?.slug && (
              <div className="border-shop_orange/30 hover:border-shop_orange hoverEffect h-20 w-20 overflow-hidden border p-1">
                <Link
                  href={{
                    pathname: "/shop#",
                    query: { category: category?.slug },
                  }}
                >
                  <Image
                    src={category?.imageUrl || placeholder}
                    alt=""
                    width={500}
                    height={500}
                    className="hoverEffect h-full w-full object-contain group-hover:scale-110"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">{category.title}</h3>
              <p className="text-sm">
                <span className="text-shop_dark_green font-bold">{`(5)`}</span>{" "}
                Items available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
