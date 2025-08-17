import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const MenuDestaque = () => {
  const opcoesDestaque = [
    {
      name: "Ar Condicionado Midea",
      path: "/ar-condicionado-midea",
      image: "ar-condicionado.png",
    },
    {
      name: "Eletrodomésticos Midea",
      path: "/electrodomesticos",
      image: "electrodomesticos.png",
    },
    {
      name: "Soluções de Energia Midea",
      path: "/solucoes-de-energia-midea",
      image: "ar-condicionado.png",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">Explorar as categorias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 w-full">
        {opcoesDestaque.map((opcao, index) => (
          <Link href={opcao.path} key={index}>
            <Card className="bg-gray-100 hover:shadow-md transition rounded-xl">
              <CardContent className="flex flex-col items-center justify-center p-4">
                <div className="w-[150px] h-[150px] flex justify-center items-center">
                  <Image
                    src={`/${opcao.image}`} // agora usa exatamente o que está no array
                    alt={opcao.name}
                    width={150}
                    height={150}
                    className="rounded-lg mb-2 object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-center">
                  {opcao.name}
                </span>
                <Button className="bg-blue-600 mt-5 rounded-full hover:bg-blue-400 text-white" variant={`default`}>Ver mais</Button>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* <div className="flex justify-center items-center">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full hover:bg-gray-200"
          >
            Ver mais
          </Button>
        </div> */}
      </div>
    </div>
  );
};
