import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  productId: string;
  imageId: string;
}

// ROTA PATCH: Definir uma imagem como padrão
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<Params> },
) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthorized: No session found", {
        status: 401,
      });
    }

    const { productId, imageId } = await params;

    console.log("produtoId:", productId);
    console.log("imageId:", imageId);

    if (!imageId) {
      return NextResponse.json(
        { message: "ID da imagem é obrigatório." },
        { status: 400 },
      );
    }

    // Use uma transação para garantir que apenas uma imagem seja padrão por vez.
    const transaction = await prisma.$transaction([
      prisma.images.updateMany({
        where: {
          productId: productId,
          default: true,
        },
        data: {
          default: false,
        },
      }),
      prisma.images.update({
        where: {
          id: imageId,
        },
        data: {
          default: true,
        },
      }),
    ]);

    return NextResponse.json({
      message: "Imagem definida como padrão com sucesso!",
      data: transaction,
    });
  } catch (error) {
    console.error("[IMAGEM_PATCH]", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
