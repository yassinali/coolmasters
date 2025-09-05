import Container from "@/components/Container";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { ProdutoDadosForm } from "../_components/produtoDados";

export const metadata: Metadata = {
  title: "Edicao das marcas",
};

interface PageProps {
  params: Promise<{ marcaId: string }>;
}

const HomePage = async ({ params }: PageProps) => {
  const id = await params;

  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  const produtoDados = await prisma.product.findFirst({
    where: {
      id: id.marcaId,
    },
  });
  console.log(produtoDados);
  if (!produtoDados) {
    unauthorized();
  }

  const dadosIniciais = {
    name: produtoDados?.name || "",
    slug: produtoDados?.slug || "",
    description: produtoDados?.description || "",
    brandId: produtoDados?.brandId,
  };

  return (
    <Container>
      <div className="mt-6 pl-6">
        <div className="flex items-center justify-between">
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <ProdutoDadosForm
                dadosIniciais={dadosIniciais}
                produtoId={(await params).marcaId}
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
