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
