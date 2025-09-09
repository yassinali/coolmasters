import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

interface Params {
  productId: string;
  imageId: string;
}

// Cria uma instância do UTApi para interagir com o Uploadthing
const utapi = new UTApi();

// ROTA DELETE: Remover uma imagem específica de um produto
export async function DELETE(
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
    console.log("Image ID recebido na rota:", imageId, productId);
    console.log("produtoId:", productId);
    if (!imageId) {
      return NextResponse.json(
        { message: "ID da imagem é obrigatório." },
        { status: 400 },
      );
    }

    const image = await prisma.images.findUnique({
      where: { id: imageId },
    });

    if (!image || image.productId !== productId) {
      return NextResponse.json(
        { message: "Imagem não encontrada." },
        { status: 404 },
      );
    }

    // Extrai o fileKey do URL da imagem para apagar o ficheiro
    const fileKey = image.imagesUrl.split("/").pop();
    if (fileKey) {
      try {
        await utapi.deleteFiles(fileKey);
      } catch (uploadthingError) {
        console.error("[UPLOADTHING_DELETE_ERROR]", uploadthingError);
        // Continua com a eliminação na base de dados mesmo se o ficheiro não for apagado
      }
    }

    // Se a imagem a ser eliminada for a imagem padrão
    if (image.default) {
      // Encontra a próxima imagem para se tornar a padrão
      const nextDefaultImage = await prisma.images.findFirst({
        where: {
          productId: productId,
          id: { not: imageId },
        },
      });

      // Transação atómica para garantir a consistência
      if (nextDefaultImage) {
        await prisma.$transaction([
          prisma.images.delete({
            where: { id: imageId },
          }),
          prisma.images.update({
            where: { id: nextDefaultImage.id },
            data: { default: true },
          }),
        ]);
      } else {
        // Se a última imagem for eliminada, não há necessidade de atualização
        await prisma.images.delete({
          where: { id: imageId },
        });
      }
    } else {
      // Se não for a imagem padrão, apenas a elimina
      await prisma.images.delete({
        where: { id: imageId },
      });
    }

    return NextResponse.json({
      message: "Imagem removida com sucesso!",
    });
  } catch (error) {
    console.error("[IMAGEM_DELETE]", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
