
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

export const MaisVendidos = () => {

    const products = [
    {
      id: 1,
      name: "Lava e Seca 10,5kg Midea Storm Wash Inverter Conectada",
      price: "MZN 3.099,00",
      originalPrice: "MZN 6.198,00",
      discount: "50% OFF",
      rating: 4.5,
      reviews: 127,
      image: "/midea-washing-machine.png",
    },
    {
      id: 2,
      name: "Lava e Seca 11kg Titânium Giro Duplo Inverter Midea Storm",
      price: "MZN 3.199,00",
      originalPrice: "MZN 6.398,00",
      discount: "50% OFF",
      rating: 4.3,
      reviews: 89,
      image: "/titanium-washing-machine.png",
    },
    {
      id: 3,
      name: "Lava Loiças 14 Serviços Porta Inox Midea",
      price: "MZN 2.799,00",
      originalPrice: "MZN 5.598,00",
      discount: "50% OFF",
      rating: 4.7,
      reviews: 203,
      image: "/stainless-steel-dishwasher.png",
    },
  ]
    return (
        <div className="flex flex-col justify-center items-center p-4 bg-white">
           <h2>Mais vendidos</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-blue-600 text-white">{product.discount}</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>

                      <div className="mb-3">
                        <div className="text-lg font-bold text-blue-600">{product.price}</div>
                        <div className="text-xs text-gray-500 line-through">{product.originalPrice}</div>
                        <div className="text-xs text-green-600">em até 10x sem juros</div>
                      </div>

                      <Button className="rounded-full w-full text-lg text-white bg-blue-600 hover:bg-blue-700">Comprar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
    );
}