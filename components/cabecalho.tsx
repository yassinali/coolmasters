import { HeartIcon, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuOptions = [
  { name: "Ar Condicionado Midea", path: "/ar-condicionado-midea" },
  { name: "Eletrodomésticos Midea", path: "/electrodomesticos" },
  { name: "Soluções de Energia Midea", path: "/solucoes-de-energia-midea" },
];
export const Cabecalho = () => {
  return (
    <div className="container flex justify-between items-center p-5 bg-white">
      <div>logo</div>
      <div className="flex gap-5 items-center">
        {menuOptions.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <div className="flex items-center space-y-2 cursor-pointer hover:text-blue-600">
              <span className="text-sm font-medium">{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-5 items-center mr-10">
        <HeartIcon />
        <User2 />
        <Image src={"/shopping-cart.svg"} height={25} width={25} alt="" />
      </div>
    </div>
  );
};
