import Container from "@/components/Container";
import { ListaDeCategorias } from "@/components/listaDeCategorias";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Categorias",
};

const Categorias = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  return (
    <Container>
      <ListaDeCategorias />
    </Container>
  );
};

export default Categorias;
