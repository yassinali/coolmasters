"use client"

import { HeartIcon, User2, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useSidebar } from "@/components/ui/sidebar"

const menuOptions = [
  { name: "Ar Condicionado Midea", path: "/ar-condicionado-midea" },
  { name: "Eletrodomésticos Midea", path: "/electrodomesticos" },
  { name: "Soluções de Energia Midea", path: "/solucoes-de-energia-midea" },
]

export const MobileHeader = () => {
  const { open } = useSidebar()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-5">
        <div className="block md:hidden items-center justify-center w-6 h-6">
          {!open && (
            <SidebarTrigger>
              <Menu className="h-6 w-6 cursor-pointer" />
            </SidebarTrigger>
          )}
          {open && (
            <SidebarTrigger>
              <X className="h-6 w-6 cursor-pointer" />
            </SidebarTrigger>
          )}
        </div>

        <div className="hidden md:block w-6 h-6"></div>

        <div className="font-bold text-lg">logo</div>

        <nav className="hidden md:flex gap-5 items-center">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <span className="text-sm font-medium cursor-pointer hover:text-blue-600">{menu.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex gap-3 md:gap-5 items-center md:mr-2">
          <HeartIcon className="cursor-pointer h-5 w-5 md:h-6 md:w-6" />
          <User2 className="cursor-pointer h-5 w-5 md:h-6 md:w-6" />
          <Image src={"/shopping-cart.svg"} height={20} width={20} alt="Carrinho" className="md:h-[25px] md:w-[25px]" />
        </div>
      </div>
    </header>
  )
}
