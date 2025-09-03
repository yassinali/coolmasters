import Container from "@/components/Container";
import { NovaMarcaCreateForm } from "@/components/novamarca";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Novo registo de marcas",
};

const NovaMarcaPage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  return (
    <Container>
      <NovaMarcaCreateForm/>
    </Container>
  );
};
export default NovaMarcaPage;
