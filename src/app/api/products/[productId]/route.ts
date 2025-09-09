import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

interface Params {
  productId: string;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  try {
    const session = await getServerSession();

    // Verificação de autenticação
    if (!session) {
      return new NextResponse("Unauthorized: No session found", {
        status: 401,
      });
    }
    const { productId } = await params;

    // Safely parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("[IMAGEM_UPDATE] Error parsing request body:", error);
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 },
      );
    }

    const { name, description, brandId, categories, status } = body;

    console.log(body);

    // Busca o funcionário pelo ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "product não encontrado." },
        { status: 404 },
      );
    }

    // Atualiza o modelo User associado
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        brandId,
        categories,
        status,
      },
    });

    return NextResponse.json({
      message: "Atualização realizada com sucesso!",
      data: {
        produto: updatedProduct,
      },
    });
  } catch (error) {
    console.error("[PRODUTO_UPDATE]", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
