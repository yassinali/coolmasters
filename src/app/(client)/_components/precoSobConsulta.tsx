"use client";

import { Product } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

interface PrecoSobConsultaProps {
  product: Product;
}
export const PrecoSobConsulta = ({ product }: PrecoSobConsultaProps) => {
  const whatsappNumber = "258820624609";
  //   const productLink = window.location.href;

  const [productLink, setProductLink] = useState("");

  useEffect(() => {
    // roda somente no cliente
    setProductLink(window.location.href);
  }, []);
  const whatsappMessage = `Olá! Gostaria de consultar o preço do produto: ${product.name}. Link do produto: ${productLink}`;
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer rounded-lg bg-yellow-100 px-4 py-1.5 text-sm font-semibold text-yellow-800 hover:bg-yellow-200"
    >
      Preço sobre consulta
    </a>
  );
};
