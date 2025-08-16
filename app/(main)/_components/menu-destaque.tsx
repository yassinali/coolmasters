import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const MenuDestaque = () => {

    const opcoesDestaque = [
  { name: "Ar Condicionado Midea", path: "/ar-condicionado-midea" },
  { name: "Eletrodomésticos Midea", path: "/electrodomesticos" },
  { name: "Soluções de Energia Midea", path: "/solucoes-de-energia-midea" },
];

    return (
        <div className="flex flex-col justify-center items-center p-4 bg-white">
  <h2 className="text-lg font-semibold mb-4">Explorar as categorias</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full">
    {opcoesDestaque.map((opcao, index) => (
      <Link href={opcao.path} key={index}>
        <Card className="bg-gray-100 hover:shadow-md transition rounded-xl">
          <CardContent className="flex flex-col items-center p-4">
            <Image
              src={`/images/${opcao.name.toLowerCase().replace(/ /g, "-")}.jpg`}
              alt={opcao.name}
              width={150}
              height={150}
              className="rounded-lg mb-2 object-cover"
            />
            <span className="text-sm font-medium text-center">{opcao.name}</span>
          </CardContent>
        </Card>
      </Link>
    ))}

    <div className="flex justify-center items-center">
      <Button
        variant="ghost"
        size="lg"
        className="rounded-full hover:bg-gray-200"
      >
        Ver mais
      </Button>
    </div>
  </div>
</div>

    );
    }