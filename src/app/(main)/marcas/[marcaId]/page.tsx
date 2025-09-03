import Container from "@/components/Container";
import { MarcaDadosForm } from "@/components/marcaDadosForm";
import { MarcaImagem } from "@/components/marcaimagem";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Edicao das marcas",
};

interface PageProps {
  params: Promise<{ marcaId: string }>;
}

const MarcaIdPage = async ({ params }: PageProps) => {
  const id = await params;

  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  const marcaDados = await prisma.brand.findFirst({
    where: {
      id: id.marcaId,
    },
  });
  console.log(marcaDados)
  if (!marcaDados) {
    unauthorized();
  }

  const dadosIniciais = {
    title: marcaDados?.title || "",
    slug: marcaDados?.slug ||"",
    description: marcaDados?.description || "",
    imageUrl: marcaDados?.imageUrl || ""
  }

  return (
    <Container>
      <div className="mt-6 pl-6">
        <div className="flex items-center justify-between">
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <MarcaDadosForm dadosIniciais={dadosIniciais} marcaId={(await params).marcaId} />
            </div>
            <div>
            
              <MarcaImagem marcaId={(await params).marcaId} dadosIniciais={dadosIniciais} />

              </div>

          </div>
        </div>
      </div>
    </Container>
  );
};

export default MarcaIdPage;