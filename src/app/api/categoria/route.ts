import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

function generateSlug(text: string): string {
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
    const { title, description } = await req.json();

    const session = await getServerSession(); // precisa de await aqui
    if (!session) {
      return new NextResponse("Nao autorizado", { status: 401 });
    }

    const slug = generateSlug(title);
    
    const result = await prisma.category.create({
      data: {
        title,
        slug,
        description,
      },
    });

    return new NextResponse(
      JSON.stringify({ id: result.id }),
      { status: 201 }
    );
  } catch (error) {
    console.log("Categoria Erro:", error);
    return new NextResponse(
      "Erro interno de sistema. Tente novamente mais tarde.",
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(); // precisa de await aqui
  if (!session) {
    return new NextResponse("Nao autorizado", { status: 401 });
  }

  try {
    const todasCategorias = await prisma.category.findMany({});

    return NextResponse.json(todasCategorias);
  } catch (error) {
    console.log("Erro ao carregar as categorias", error);
    return new NextResponse("Falha ao carregar as categorias", { status: 500 });
  }
}



