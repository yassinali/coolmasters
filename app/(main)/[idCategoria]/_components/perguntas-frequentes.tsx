import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export const PerguntasFrequentes = () => {
  return (
    <div className="bg-white pt-8">
      <h2 className="text-3xl font-bold text-gray-500">
        <Image
        src={`/perguntas-frequentes.webp`}
        alt="Perguntas Frequentes"
        width={50}
        height={50}
        className="inline-block mr-2"
        />
        Perguntas Frequentes</h2>
        <Separator/>
    </div>
  );
}