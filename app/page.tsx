/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Cabecalho } from "@/components/cabecalho"
import { CarouselPage } from "./(main)/_components/carousel"
import { MenuDestaque } from "./(main)/_components/menu-destaque"
import Image from "next/image"
import { MaisVendidos } from "./(main)/_components/mais-vendidos"
import { ComoPodemosAjudar } from "./(main)/_components/como-podemos-ajudar"

export default function MideaPage() {

    const opcoes = [
    {
      titulo: "Whatsapp",
      descricao:
        "Fale com a gente pelo aplicativo de mensagens, facilitando ainda mais o contato com a nossa equipe.",
      botao: "Conversar agora",
    },
    {
      titulo: "Reparo no produto",
      descricao:
        "Para produtos dentro da garantia é necessário entrar em contato para acionarmos a assistência técnica.",
      botao: "Conversar agora",
    },
    {
      titulo: "Assistência Técnica",
      descricao:
        "Para produtos fora da garantia, basta realizar o agendamento com a autorizada mais próxima de você!",
      botao: "Consulte a rede credenciada",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-10">
      <div className="container mx-auto">
      {/* Header Banner */}
      <div>
        <Cabecalho/>
       
      </div>
      <div className="flex justify-center items-center mt-10 mb-10">
         <CarouselPage/>
      </div>
      <div className="flex flex-col justify-center items-center mb-10 bg-blue-600 text-white p-20">
        banner
      </div>
  
   <div>
    <MenuDestaque/>
   </div>
  <div className="mt-10 mb-10 w-full">
  <Image
    src="/coolmaster-default.jpg"
    alt="Banner Coolmaster"
    width={1920}
    height={400}
    className="w-full h-auto object-cover"
  />
</div>

   <div>
    <MaisVendidos/>
   </div>
   <div className="grid grid-cols-2 lg:grid-cols-4 mt-20 gap-5 bg-slate-400">
    C
   </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
       

          {/* Main Content */}
          <div className="flex-1">
            {/* Products Grid */}
           

            <div className="text-center">
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
                Ver mais produtos
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 text-center bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">
            Eletrodomésticos Midea: lava e seca, Geleira, frigobar, lava loiças e mais!
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A Midea se destaca no mercado de eletrodomésticos fornecendo a você design inovador. Nossos eletrodomésticos
            possuem tecnologia de ponta com design moderno. Os produtos são eficientes, duráveis e energeticamente
            econômicos, oferecendo excelente custo-benefício para sua casa.
          </p>
        </div>

      </div>
     <ComoPodemosAjudar/>

      {/* Footer */}
     <Footer/>
    </div>
    </div>
  )
}
