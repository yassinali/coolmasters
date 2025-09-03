import Container from "@/components/Container";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { NovaCategoriaCreateForm } from "../_component/novaCategoria";

export const metadata: Metadata = {
  title: "Novo registo de categorias",
};

const NovaCategoriaPage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  return (
    <Container>
      <NovaCategoriaCreateForm/>
    </Container>
  );
};
export default NovaCategoriaPage;
