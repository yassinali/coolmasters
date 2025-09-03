import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

interface Params {
  marcaId: string;
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
    const { marcaId } = await params;

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
    const marca = await prisma.brand.findUnique({
      where: { id: marcaId },
    });

    if (!marca) {
      return NextResponse.json(
        { message: "marca não encontrado." },
        { status: 404 },
      );
    }
    // console.log("Imagem link ", imageUrl);

    // Atualiza o modelo User associado
    const updatedMarca = await prisma.brand.update({
      where: { id: marcaId },
      data: {
        title,
        description,
        imageUrl: imageUrl || undefined,
      },
    });

    return NextResponse.json({
      message: "Atualização realizada com sucesso!",
      data: {
        marca: updatedMarca,
      },
    });
  } catch (error) {
    console.error("[MARCA_UPDATE]", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
