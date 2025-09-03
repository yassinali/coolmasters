import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

interface Params {
  categoriaId: string;
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
    const { categoriaId } = await params;

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

    const { title, description, imageUrl } = body;

    // Busca o funcionário pelo ID
    const categoria = await prisma.category.findUnique({
      where: { id: categoriaId },
    });

    if (!categoria) {
      return NextResponse.json(
        { message: "categoria não encontrado." },
        { status: 404 },
      );
    }
    // console.log("Imagem link ", imageUrl);

    // Atualiza o modelo User associado
    const updatedCategoria = await prisma.category.update({
      where: { id: categoriaId },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json({
      message: "Atualização realizada com sucesso!",
      data: {
        categoria: updatedCategoria,
      },
    });
  } catch (error) {
    console.error("[categoria_UPDATE]", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
