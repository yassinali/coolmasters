import React, { Suspense } from "react";
import Shop from "../_components/shop";
import prisma from "@/lib/prisma";

const HomePage = async () => {
  const categories = (
    await prisma.category.findMany({ orderBy: { id: "desc" } })
  ).map((cat) => ({
    ...cat,
    title: cat.title || "",
    slug: cat.slug || "",
    imageUrl: cat.imageUrl || "",
  }));

  const brands = (await prisma.brand.findMany({ orderBy: { id: "desc" } })).map(
    (brand) => ({
      ...brand,
      title: brand.title || "",
      slug: brand.slug || "",
      description: brand.description || "",
      imageUrl: brand.imageUrl || "",
    }),
  );

  return (
    <div className="min-h-0 bg-white">
      <Suspense fallback={<p>Carregando...</p>}>
        <Shop categories={categories} brands={brands} />
      </Suspense>
    </div>
  );
};

export default HomePage;
