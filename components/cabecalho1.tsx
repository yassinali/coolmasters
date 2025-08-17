"use client"

import { HeartIcon, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const menuOptions = [
  { name: "Ar Condicionado Midea", path: "/ar-condicionado-midea" },
  { name: "Eletrodomésticos Midea", path: "/electrodomesticos" },
  { name: "Soluções de Energia Midea", path: "/solucoes-de-energia-midea" },
]

export const Cabecalho = () => {
  return (
    <header className="hidden md:block container mx-auto bg-white shadow-sm">
      <div className="flex justify-between items-center p-5">
        <div className="font-bold text-lg">logo</div>

        {/* Menu desktop */}
        <nav className="flex gap-5 items-center">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <span className="text-sm font-medium cursor-pointer hover:text-blue-600">{menu.name}</span>
            </Link>
          ))}
        </nav>

        {/* Ícones à direita */}
        <div className="flex gap-5 items-center mr-2">
          <HeartIcon className="cursor-pointer" />
          <User2 className="cursor-pointer" />
          <Image src={"/shopping-cart.svg"} height={25} width={25} alt="Carrinho" />
        </div>
      </div>
    </header>
  )
}
