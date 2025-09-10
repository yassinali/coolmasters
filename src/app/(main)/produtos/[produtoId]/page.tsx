import Container from "@/components/Container";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { ProdutoDadosForm } from "../_components/produtoDados";
import { ProdutoImagensForm } from "../_components/produtoImagensForm";

export const metadata: Metadata = {
  title: "Edicao das marcas",
};

interface PageProps {
  params: Promise<{ produtoId: string }>;
}

const HomePage = async ({ params }: PageProps) => {
  const id = await params;

  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  const produtoDados = await prisma.product.findFirst({
    where: {
      id: id.produtoId,
    },
    include: {
      images: true, // Inclui o array de imagens
    },
  });

  if (!produtoDados) {
    unauthorized();
  }

  const dadosIniciais = {
    name: produtoDados?.name || "",
    slug: produtoDados?.slug || "",
    description: produtoDados?.description || "",
    brandId: produtoDados?.brandId,
    status: produtoDados?.status,
    images: produtoDados?.images || [], // Passa o array de imagens completo
  };

  return (
    <Container>
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex w-full flex-col">
          <ProdutoDadosForm
            dadosIniciais={dadosIniciais}
            produtoId={id.produtoId}
          />
        </div>
        <div className="flex w-full flex-col">
          <ProdutoImagensForm
            produtoId={id.produtoId}
            dadosIniciais={dadosIniciais}
          />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
