import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Função para gerar slug a partir do título
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
    
    const result = await prisma.brand.create({
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
    console.log("Marcas Erro:", error);
    return new NextResponse(
      "Erro interno de sistema. Tente novamente mais tarde.",
      { status: 500 }
    );
  }
}

export async function GET(){
const session = await getServerSession(); // precisa de await aqui
    if (!session) {
      return new NextResponse("Nao autorizado", { status: 401 });
    }

   try {
     const todasMarcas = await prisma.brand.findMany({})

    return NextResponse.json(todasMarcas);
   } catch (error) {
    console.log("Erro ao carregar as marcas",error);
    return new NextResponse("Falha ao carregar as marcas", {status: 500})
   }
}
