// app/api/products-by-category/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json(
      { message: "Category ID is required" },
      { status: 400 },
    );
  }

  try {
    const products = await prisma.product.findMany({
      where: {
        categories: {
          some: {
            id: categoryId,
          },
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
