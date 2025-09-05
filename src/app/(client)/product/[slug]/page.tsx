import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";
import prisma from "@/lib/prisma";
import Container from "@/components/Container";
import ImageView from "../../_components/imageView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SingleProductPage = async ({ params }: PageProps) => {
  const slug = await params;

  const product = await prisma.product.findFirst({
    where: {
      slug: (await params).slug,
    },
    include: {
      images: true, // Adiciona o `include` para carregar as imagens
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col gap-10 py-10 md:flex-row">
      {product?.images && (
        <ImageView images={product.images} isStock={product.stock} />
      )}
      <div className="flex w-full flex-col gap-5 md:w-1/2">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="line-clamp-9 text-sm tracking-wide text-gray-600">
            {product?.description}
          </p>
          <div className="flex items-center gap-0.5 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className="text-shop_light_green"
                fill={"#3b9c3c"}
              />
            ))}
            <p className="font-semibold">{`(120)`}</p>
          </div>
        </div>
        <div className="space-y-2 border-t border-b border-gray-200 py-5">
          <p
            className={`inline-block rounded-lg px-4 py-1.5 text-center text-sm font-semibold ${product?.stock === 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
          >
            {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="flex items-center gap-2.5 lg:gap-3"></div>
        <div className="-mt-2 flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5">
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <RxBorderSplit className="text-lg" />
            <p>Compare color</p>
          </div>
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <FaRegQuestionCircle className="text-lg" />
            <p>Ask a question</p>
          </div>
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <TbTruckDelivery className="text-lg" />
            <p>Delivery & Return</p>
          </div>
          <div className="hoverEffect flex items-center gap-2 text-sm text-black hover:text-red-600">
            <FiShare2 className="text-lg" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="border-lightColor/25 flex items-center gap-2.5 border border-b-0 p-3">
            <Truck size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Free Delivery
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Enter your Postal code for Delivey Availability.
              </p>
            </div>
          </div>
          <div className="border-lightColor/25 flex items-center gap-2.5 border p-3">
            <CornerDownLeft size={30} className="text-shop_orange" />
            <div>
              <p className="text-base font-semibold text-black">
                Return Delivery
              </p>
              <p className="text-sm text-gray-500">
                Free 30days Delivery Returns.{" "}
                <span className="underline underline-offset-2">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
