import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

interface Params {
  productId: string;
}

// ROTA POST: Adicionar uma nova imagem a um produto
export async function POST(
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

    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { message: "URL da imagem é obrigatória." },
        { status: 400 },
      );
    }

    const { productId } = await params;

    console.log("Product ID recebido na rota:", productId);

    const existingImages = await prisma.images.count({
      where: {
        productId: productId,
      },
    });

    const newImage = await prisma.images.create({
      data: {
        imagesUrl: imageUrl,
        productId: productId,
        default: existingImages === 0,
      },
    });

    return NextResponse.json({
      message: "Imagem adicionada com sucesso!",
      data: newImage,
    });
  } catch (error) {
    console.error("[IMAGEM_POST]", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
