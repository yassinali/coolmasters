/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import { Footer } from "@/components/footer"

export   const products = [
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
    {
      id: 4,
      name: "Cervejeira Frost Free Plus 3 em 1 Midea 142 Litros Inox",
      price: "MZN 1.249,00",
      originalPrice: "MZN 2.498,00",
      discount: "50% OFF",
      rating: 4.2,
      reviews: 156,
      image: "/beer-cooler-refrigerator.png",
    },
    {
      id: 5,
      name: "Lava e Seca 10,5kg Branca Higienização Conectada",
      price: "MZN 2.999,00",
      originalPrice: "MZN 5.998,00",
      discount: "50% OFF",
      rating: 4.4,
      reviews: 98,
      image: "/placeholder.png",
    },
    {
      id: 6,
      name: "Frigobar Black Edition Preto 67 Litros Midea",
      price: "MZN 1.199,00",
      originalPrice: "MZN 2.398,00",
      discount: "50% OFF",
      rating: 4.1,
      reviews: 74,
      image: "/placeholder.png",
    },
    {
      id: 7,
      name: "Lava Loiças 14 Serviços Cinza Prata",
      price: "MZN 2.299,00",
      originalPrice: "MZN 4.598,00",
      discount: "50% OFF",
      rating: 4.6,
      reviews: 187,
      image: "/gray-dishwasher.png",
    },
    {
      id: 8,
      name: "Máquina de Lavar 9kg Titânium Giro Duplo Higienização Conectada",
      price: "MZN 2.999,00",
      originalPrice: "MZN 5.998,00",
      discount: "50% OFF",
      rating: 4.5,
      reviews: 142,
      image: "/titanium-washing-machine.png",
    },
    {
      id: 9,
      name: "Geleira Frost Free Duplex 375L Inverter Prata Conectada Midea",
      price: "MZN 2.899,00",
      originalPrice: "MZN 5.798,00",
      discount: "50% OFF",
      rating: 4.3,
      reviews: 165,
      image: "/silver-duplex-refrigerator.png",
    },
    {
      id: 10,
      name: "Frigobar Black Edition Preto 93 Litros Midea",
      price: "MZN 999,00",
      originalPrice: "MZN 1.998,00",
      discount: "50% OFF",
      rating: 4.0,
      reviews: 91,
      image: "/placeholder.png",
    },
    {
      id: 11,
      name: "Frigobar Black Edition Preto 67 Litros Midea",
      price: "MZN 899,00",
      originalPrice: "MZN 1.798,00",
      discount: "50% OFF",
      rating: 4.2,
      reviews: 67,
      image: "/placeholder.png",
    },
    {
      id: 12,
      name: "Geleira Side by Side 511L Inverter Prata Conectada Midea",
      price: "MZN 4.999,00",
      originalPrice: "MZN 9.998,00",
      discount: "50% OFF",
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.png",
    },
  ]
  
export default function MideaPage() {


  const categories = [
    { name: "Ar-condicionado", icon: "❄️" },
    { name: "Lava e Seca", icon: "🌀" },
    { name: "Geleira", icon: "🧊" },
    { name: "Lava-loiças", icon: "🍽️" },
    { name: "Frigobar", icon: "🍺" },
    { name: "Outros", icon: "📦" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">MideaDay</h1>
                <p className="text-blue-100">Tecnologia, Design e Economia</p>
              </div>
              <img
                src="/placeholder.png?height=120&width=120"
                alt="Homem com eletrodomésticos"
                className="h-24 w-24 rounded-full"
              />
            </div>
            <div className="text-right">
              <p className="text-sm mb-1">Produtos com até</p>
              <div className="text-5xl font-bold">50% OFF</div>
              <p className="text-sm">por mais dias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 cursor-pointer hover:text-blue-600">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {category.icon}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Eletrodomésticos</h3>
                <div className="space-y-2 text-sm">
                  <div className="cursor-pointer hover:text-blue-600">Categorias</div>
                  <div className="cursor-pointer hover:text-blue-600">Marcas</div>
                  <div className="cursor-pointer hover:text-blue-600">Abertura da Porta</div>
                  <div className="cursor-pointer hover:text-blue-600">Capacidade</div>
                  <div className="cursor-pointer hover:text-blue-600">Capacidade (Litros)</div>
                  <div className="cursor-pointer hover:text-blue-600">Cor</div>
                  <div className="cursor-pointer hover:text-blue-600">Eficiência Energética</div>
                  <div className="cursor-pointer hover:text-blue-600">Inteligência Artificial</div>
                  <div className="cursor-pointer hover:text-blue-600">Inverter</div>
                  <div className="cursor-pointer hover:text-blue-600">Produtos conectados</div>
                  <div className="cursor-pointer hover:text-blue-600">Tipo</div>
                  <div className="cursor-pointer hover:text-blue-600">Tipo de instalação</div>
                  <div className="cursor-pointer hover:text-blue-600">Tipo de motor</div>
                  <div className="cursor-pointer hover:text-blue-600">Voltagem</div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium mb-3">Preço</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">MZN</span>
                      <input type="number" placeholder="0" className="flex-1 px-2 py-1 border rounded text-sm" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">MZN</span>
                      <input type="number" placeholder="10.000" className="flex-1 px-2 py-1 border rounded text-sm" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.png"}
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

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Comprar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                Ver mais produtos
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Eletrodomésticos Midea: lava e seca, Geleira, frigobar, lava loiças e mais!
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A Midea se destaca no mercado de eletrodomésticos fornecendo a você design inovador. Nossos eletrodomésticos
            possuem tecnologia de ponta com design moderno. Os produtos são eficientes, duráveis e energeticamente
            econômicos, oferecendo excelente custo-benefício para sua casa.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">❓ Perguntas Frequentes</h3>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">Como escolher o eletrodoméstico ideal para meu espaço?</h4>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">A lava e seca Midea economiza muita energia?</h4>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-medium mb-2">Qual a melhor voltagem para o meu eletrodoméstico?</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  )
}
