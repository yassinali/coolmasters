"use client";

import { AnimatePresence, motion } from "framer-motion"; // Use framer-motion, já que a sintaxe é mais comum
import Image from "next/image";
import React, { useState } from "react";

// Interface para o modelo Images do Prisma
interface ImageModel {
  id: string;
  imagesUrl: string;
  default: boolean;
  productId: string;
}

interface Props {
  images?: ImageModel[];
  isStock?: number | null; // Tipagem ajustada
}

const ImageView = ({ images = [], isStock }: Props) => {
  // Encontra a primeira imagem ou a imagem padrão se existir
  const [active, setActive] = useState(
    images.find((img) => img.default) || images[0],
  );

  if (!active) {
    return null; // Não renderiza nada se não houver imagens
  }

  return (
    <div className="w-full space-y-2 md:w-1/2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="group border-darkColor/10 max-h-[550px] min-h-[450px] w-full overflow-hidden rounded-md border"
        >
          <Image
            src={active.imagesUrl} // Usa diretamente a URL da imagem
            alt="productImage"
            width={700}
            height={700}
            priority
            className={`hoverEffect max-h-[550px] min-h-[500px] w-full rounded-md object-contain group-hover:scale-110 ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid h-20 grid-cols-6 gap-2 md:h-24">
        {images?.map((image) => (
          <button
            key={image.id}
            onClick={() => setActive(image)}
            className={`overflow-hidden rounded-md border ${
              active.id === image.id
                ? "border-darkColor opacity-100"
                : "opacity-80"
            }`}
          >
            <Image
              src={image.imagesUrl} // Usa diretamente a URL da imagem
              alt={`Thumbnail ${image.id}`}
              width={100}
              height={100}
              className="h-auto w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageView;
