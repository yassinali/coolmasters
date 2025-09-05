import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Tipos derivados do client
type ProductFindManyArgs = NonNullable<
  Parameters<typeof prisma.product.findMany>[0]
>;
type ProductWhereInput = NonNullable<ProductFindManyArgs["where"]>;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const brand = searchParams.get("brand");

    const where: ProductWhereInput = {};

    if (category) {
      where.categories = {
        some: { slug: category },
      };
    }

    if (brand) {
      where.brand = {
        slug: brand,
      };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        categories: true,
        brand: true,
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro na API /products", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 },
    );
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase() // tudo minúsculo
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // remove caracteres especiais
    .trim() // remove espaços extras
    .replace(/\s+/g, "-"); // substitui espaços por "-"
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const { name, description, brandId, categories } = await req.json();

    const slug = generateSlug(name);

    const isExistSlug = await prisma.product.findFirst({
      where: {
        slug,
      },
    });

    if (isExistSlug) {
      return NextResponse.json(
        { message: "O produto já foi registado" },
        { status: 409 },
      );
    }

    // Mapeia o array de strings (IDs) para a estrutura esperada pelo Prisma
    const categoriesToConnect = categories.map((id: string) => ({
      id,
    }));

    const result = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        brandId,
        categories: {
          connect: categoriesToConnect,
        },
      },
    });

    return NextResponse.json(
      {
        id: result.id,
        message: "Produto registado com sucesso",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Produtos Erro:", error);
    return new NextResponse(
      "Erro interno de sistema. Tente novamente mais tarde.",
      { status: 500 },
    );
  }
}
