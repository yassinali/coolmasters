import Container from "@/components/Container";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { CategoriaDadosForm } from "../_component/categoriaDadosForm";

export const metadata: Metadata = {
  title: "Edicao de categrias",
};

interface PageProps {
  params: Promise<{ categoriaId: string }>;
}

const CategoriaIdPage = async ({ params }: PageProps) => {
  const id = await params;

  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  const categoriaDados = await prisma.category.findFirst({
    where: {
      id: id.categoriaId,
    },
  });
  console.log(categoriaDados)
  if (!categoriaDados) {
    unauthorized();
  }

  const dadosIniciais = {
    title: categoriaDados?.title || "",
    slug: categoriaDados?.slug ||"",
    description: categoriaDados?.description || "",
    imageUrl: categoriaDados?.imageUrl || ""
  }

  return (
    <Container>
      <div className="mt-6 pl-6">
        <div className="flex items-center justify-between">
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <CategoriaDadosForm dadosIniciais={dadosIniciais} categoriaId={(await params).categoriaId} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoriaIdPage;