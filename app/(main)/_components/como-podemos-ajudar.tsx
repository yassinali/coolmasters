import Image from "next/image";

export const ComoPodemosAjudar = () => {
    const opcoes = [
        {
        titulo: "Whatsapp",
        descricao:
            "Fale com a gente pelo aplicativo de mensagens, facilitando ainda mais o contato com a nossa equipe.",
        imagem: "/whatsapp.png",
        botao: "Conversar agora",
        },
        {
        titulo: "Reparo no produto",
        descricao:
            "Para produtos dentro da garantia é necessário entrar em contato para acionarmos a assistência técnica.",
        imagem: "/reparar.png",
        botao: "Conversar agora",
        },
        {
        titulo: "Assistência Técnica",
        descricao:
            "Para produtos fora da garantia, basta realizar o agendamento com a autorizada mais próxima de você!",
        imagem: "/assistencia.png",
        botao: "Consulte a rede credenciada",
        },
    ];
    
    return (
        <div className="flex flex-col items-center justify-center mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center">
        Como podemos te ajudar?
      </h2>

      <div className="mt-10 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300 w-full max-w-6xl">
        {opcoes.map((opcao, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 flex-1"
          >
          
          

            <h3 className="text-xl">{opcao.titulo}</h3>
              <div className="text-5xl mb-4 mt-5"><Image src={opcao.imagem} alt="" height={50} width={70}/> </div>
            <p className="text-gray-600 mt-3">{opcao.descricao}</p>

            <button className="mt-6 px-6 py-2 border border-black rounded-full">
              {opcao.botao}
            </button>
          </div>
        ))}
      </div>
    </div>
    );
    }