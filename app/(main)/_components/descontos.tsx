"use client"

import { ChevronRight } from "lucide-react"
import Image from "next/image"

export const Descontos = () => {
  const descontos = [
    {
      titulo: "DESCONTOS DE ATÉ 10% OFF",
      subtitulo: "Ar Condicionado",
      imagem: "/10porcento.svg",
      link: "/produtos/ar-condicionado",
    },
    {
      titulo: "DESCONTOS DE ATÉ 15% OFF",
      subtitulo: "Eletrodomésticos",
      imagem: "/20porcento.svg",
      link: "/produtos/eletrodomesticos",
    },
    {
      titulo: "DESCONTOS DE ATÉ 20% OFF",
      subtitulo: "Soluções de Energia",
      imagem: "/30porcento.svg",
      link: "/produtos/solucoes-energia",
    },
    {
      titulo: "DESCONTOS DE ATÉ 25% OFF",
      subtitulo: "Linha Branca",
      imagem: "/50porcento.svg",
      link: "/produtos/linha-branca",
    },
  ]

  const handleVerProdutos = (link: string) => {
    window.open(link, "_blank")
  }

  return (
    <div className="w-full bg-white py-5">
      <div className="">
        {/* grid com separadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {descontos.map((desconto, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer"
              onClick={() => handleVerProdutos(desconto.link)}
            >
              <div className="flex items-start gap-4">
                {/* Ícone */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                   <Image src={desconto.imagem} height={30} width={50} alt="" />
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-600 text-sm mb-1 font-semibold">
                    {desconto.titulo}
                  </h3>
                  <button
                    className="flex items-center text-sm hover:underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVerProdutos(desconto.link)
                    }}
                  >
                    Ver produtos
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
