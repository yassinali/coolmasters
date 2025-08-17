"use client";

import { HeartIcon, User2, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

const menuOptions = [
  { name: "Ar Condicionado Midea", path: "/ar-condicionado-midea" },
  { name: "Eletrodomésticos Midea", path: "/electrodomesticos-media" },
  { name: "Soluções de Energia Midea", path: "/solucoes-de-energia-midea" },
];

export const MobileHeader = () => {
  const { open } = useSidebar();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-5">
        {/* Menu Hambúrguer (para dispositivos móveis) */}
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

        {/* Logo (à esquerda) */}
        <div className="flex-shrink-0">
          <Link href={"/"}><Image src={"/Cool-logo.gif"} alt="Logo" height={60} width={100} /></Link>
        </div>

        {/* Menu Centralizado (apenas para dispositivos maiores) */}
        <nav className="hidden md:flex flex-1 justify-center gap-5 items-center">
          {menuOptions.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <span className="font-medium text-muted-foreground text-gray-500 cursor-pointer">{menu.name}</span>
            </Link>
          ))}
        </nav>

        {/* Ícones (à direita) */}
        <div className="flex gap-3 md:gap-5 items-center ml-auto">
          <HeartIcon className="cursor-pointer h-5 w-5 md:h-6 md:w-6" />
          <User2 className="cursor-pointer h-5 w-5 md:h-6 md:w-6" />
          <Image src={"/shopping-cart.svg"} height={20} width={20} alt="Carrinho" className="md:h-[25px] md:w-[25px] cursor-pointer" />
        </div>
      </div>
    </header>
  );
};
