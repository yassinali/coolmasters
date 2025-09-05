import Link from "next/link";
import Image from "next/image";
import React from "react";

import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import prisma from "@/lib/prisma";
import { Title } from "@/components/text";

// import placeholder from "@/public/placeholder.png";

const extraData = [
  {
    title: "Entrega Gratuita",
    description: "Envio gratuito em compras superiores a 50000",
    icon: <Truck size={45} />,
  },
  {
    title: "Devolução Gratuita",
    description: "Devolução gratuita em compras superiores a 50000",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Apoio ao Cliente",
    description: "Apoio amigável 24/7",
    icon: <Headset size={45} />,
  },
  {
    title: "Garantia de Reembolso",
    description: "Qualidade verificada pela nossa equipa",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrand = async () => {
  const brands = await prisma.brand.findMany({});
  const placeholder =
    "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhmlskf5VdOjWVx2cfgqaZoF4byvOwN8tMzp7lQR";
  return (
    <div className="bg-shop_light_bg mb-10 rounded-md p-5 lg:p-7 lg:pb-20">
      <div className="mb-10 flex items-center justify-between gap-5">
        <Title>Nossas marcas</Title>
        <Link
          href={`/shop#`}
          className="hover:text-shop_btn_dark_green hoverEffect text-sm font-semibold tracking-wide"
        >
          Ver todos
        </Link>
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-4 lg:grid-cols-8">
        {brands?.map((brand) => (
          <Link
            key={brand.id}
            href={{ pathname: "/shop", query: { brand: brand.slug } }}
            className="shadow-shop_dark_green/20 flex h-24 w-36 items-center justify-center overflow-hidden rounded-md bg-white hover:shadow-lg"
          >
            <Image
              src={brand?.imageUrl || placeholder}
              alt=""
              width={250}
              height={250}
              className="h-32 w-32 object-contain"
            />
          </Link>
        ))}
      </div>

      <div className="shadow-shop_light_green/20 mt-16 grid grid-cols-1 gap-4 p-2 py-5 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {extraData.map((item, index) => (
          <div
            key={index}
            className="group text-lightColor hover:text-shop_light_green flex items-center gap-3"
          >
            <span className="hoverEffect inline-flex scale-100 group-hover:scale-90">
              {item.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item.title}
              </p>
              <p className="text-lightColor">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrand;
