"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export const ComoPodemosAjudar = () => {

  const router = useRouter();

  const handleWhatsAppClick = () => {
    const phoneNumber = "258823333369" // Substitua pelo número real
    const message = "Olá! Gostaria de falar sobre produtos Coolmasters."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleReparoClick = () => {
    // Função para reparo - pode redirecionar para formulário ou WhatsApp específico
    const phoneNumber = "258823333369" // Substitua pelo número real
    const message = "Preciso de reparo para meu produto Coolmasters dentro da garantia."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleAssistenciaClick = () => {
   router.push('/assistencia-tecnica') ;
  }

  const opcoes = [
    {
      titulo: "Whatsapp",
      descricao: "Fale com a gente pelo aplicativo de mensagens, facilitando ainda mais o contato com a nossa equipe.",
      imagem: "/whatsapp.png",
      botao: "Conversar agora",
      onClick: handleWhatsAppClick,
    },
    {
      titulo: "Reparo no produto",
      descricao:
        "Para produtos dentro da garantia é necessário entrar em contato para acionarmos a assistência técnica.",
      imagem: "/reparar.png",
      botao: "Conversar agora",
      onClick: handleReparoClick,
    },
    {
      titulo: "Assistência Técnica",
      descricao: "Para produtos fora da garantia, basta realizar o agendamento com a autorizada mais próxima de você!",
      imagem: "/assistencia.png",
      botao: "Consulte a rede credenciada",
      onClick: handleAssistenciaClick,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center">Como podemos te ajudar?</h2>

      <div className="mt-10 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300 w-full max-w-6xl">
        {opcoes.map((opcao, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 flex-1">
            <h3 className="text-xl">{opcao.titulo}</h3>
            <div className="text-5xl mb-4 mt-5">
              <Image src={opcao.imagem || "/placeholder.svg"} alt="" height={50} width={70} />{" "}
            </div>
            <p className="text-gray-600 mt-3">{opcao.descricao}</p>

            <Button className="mt-6 px-6 py-2 border border-black rounded-full" onClick={opcao.onClick}>
              {opcao.botao}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
