
import { Footer } from "@/components/footer"
import { CarouselPage } from "./(main)/_components/carousel"
import { MenuDestaque } from "./(main)/_components/menu-destaque"
import Image from "next/image"
import { ComoPodemosAjudar } from "./(main)/_components/como-podemos-ajudar"
import { MideaProducts } from "./(main)/_components/mais-vendidos"
import { Promocao } from "./(main)/_components/promocao"
import { Descontos } from "./(main)/_components/descontos"

export default function MideaPage() {
  return (
    <div className="min-h-screen bg-gray-10">
   

      <div className="container mx-auto">

        <div className="flex justify-center items-center mt-10 mb-10">
          <CarouselPage />
        </div>

        <div className="flex flex-col justify-center items-center mb-10 bg-white text-black p-20">
          <Descontos/>
        </div>

        <div>
          <MenuDestaque />
        </div>

        <div className="mt-10 mb-10 w-full bg-gray-50">
          <Image
            src="/coolmaster-default.jpg"
            alt="Banner Coolmaster"
            width={1920}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <MideaProducts />
        </div>

        <Promocao/>

       

        {/* About Section */}
        <div className="mt-16 text-center bg-gray-100 p-8">
          <h2 className="text-3xl font-bold mb-4">
            Eletrodomésticos Midea: lava e seca, Geleira, frigobar, lava loiças e mais!
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed text-2xl">
            A Midea se destaca no mercado de eletrodomésticos fornecendo a você design inovador. Nossos eletrodomésticos
            possuem tecnologia de ponta com design moderno. Os produtos são eficientes, duráveis e energeticamente
            econômicos, oferecendo excelente custo-benefício para sua casa.
          </p>
        </div>
      </div>

      <ComoPodemosAjudar />

      {/* Footer */}
      <Footer />
    </div>
  )
}
