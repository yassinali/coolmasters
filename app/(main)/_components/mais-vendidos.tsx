import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ArrowDown } from "lucide-react"
import Image from "next/image"

export const MideaProducts = () => {
  const products = [
    {
      id: 1,
      name: "Fritadeira Air Fryer 5.5L Cyclone Preto e Inox Midea",
      price: "MTN 299,00",
      originalPrice: "MTN 479,00",
      discount: "38%",
      pixPrice: "MTN 299,00",
      installments: "em até 5x de MTN 59,80 s/ juros",
      rating: 5,
      reviews: 2,
      image: "/wash.png",
      isLaunch: true,
      coupon: null,
      freeShipping: true,
    },
    {
      id: 2,
      name: "Cervejeira Frost Free Flex 3 em 1 Midea 96 L",
      price: "MTN 1.849,00",
      originalPrice: "MTN 2.799,00",
      discount: "34%",
      pixPrice: "MTN 1.849,00",
      installments: "em até 12x de MTN 154,08 s/ juros",
      rating: 4,
      reviews: 113,
      image: "/imagem1.png",
      isLaunch: false,
      coupon: { value: "MTN100 off", code: "MAIS100" },
      freeShipping: false,
    },
    {
      id: 3,
      name: "Freezer Horizontal 3 em 1 Branco 100L Midea",
      price: "MTN 1.199,00",
      originalPrice: "MTN 1.769,00",
      discount: "32%",
      pixPrice: "MTN 1.199,00",
      installments: "em até 12x de MTN 99,91 s/ juros",
      rating: 5,
      reviews: 86,
      image: "/imagem2.png",
      isLaunch: false,
      coupon: { value: "MTN50 off", code: "MAIS50" },
      freeShipping: false,
    },
    {
      id: 4,
      name: "Freezer Horizontal Digital FlexBeer Preto 100L Midea",
      price: "MTN 1.399,00",
      originalPrice: "MTN 1.999,00",
      discount: "30%",
      pixPrice: "MTN 1.399,00",
      installments: "em até 12x de MTN 116,58 s/ juros",
      rating: 5,
      reviews: 57,
      image: "/imagem3.png",
      isLaunch: false,
      coupon: { value: "MTN100 off", code: "MAIS100" },
      freeShipping: true,
    },
  ]

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-4xl font-bold mb-6 text-center ">Favoritos do Coolmasters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <CardContent className="p-0 flex flex-col flex-1">
              <div className="flex">
                <div className="bg-blue-600 text-white text-center py-2 px-4 text-sm font-medium flex-1">MIDEA DAY</div>
                {product.isLaunch && (
                  <div className="bg-orange-500 text-white text-center py-2 px-4 text-sm font-medium">LANÇAMENTO</div>
                )}
              </div>

              {/* Product image and heart icon */}
              <div className="relative p-4">
                <button className="absolute top-2 right-2 p-1">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                </button>

                <div className="flex justify-center items-center h-48 mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="object-contain"
                  />
                </div>

                {/* Coupon */}
                <div className="min-h-[60px] mb-4">
                  {product.coupon ? (
                    <div className="flex items-center justify-between bg-blue-600 text-white p-2 rounded">
                      <div className="flex items-center gap-2">
                        <div className="bg-white text-blue-600 p-1 rounded">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">{product.coupon.value}</div>
                          <div className="text-xs opacity-90">com o cupom</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white text-blue-600 border-white hover:bg-gray-100 text-xs px-2 py-1"
                      >
                        {product.coupon.code}
                      </Button>
                    </div>
                  ) : (
                    <div className="h-[60px]"></div>
                  )}
                </div>
              </div>

              {/* Product details */}
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <h3 className="font-medium text-sm mb-3 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-cyan-400 text-cyan-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-400 ml-2">({product.reviews})</span>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    <Badge className="bg-blue-400 text-white text-xs px-1 py-0"><ArrowDown/>{product.discount}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{product.price}</div>
                  <div className="text-sm text-gray-600 mb-1">à vista via M-PESA</div>
                  <div className="text-sm text-gray-600">ou {product.pixPrice}</div>
                  <div className="text-sm text-gray-500">{product.installments}</div>
                </div>

                {/* Free shipping badge */}à vista via M-PESA
                <div className="min-h-[32px] mb-4 flex items-start">
                  {product.freeShipping && (
                    <Badge className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-1">🚚 Frete Grátis Maputo e Matola</Badge>
                  )}
                </div>

                {/* Buy button */}
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-medium mt-auto">
                  Comprar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
