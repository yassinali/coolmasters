import Container from "@/components/Container";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";
import { ListaDeProdutos } from "./_components/listaDeProdutos";

export const metadata: Metadata = {
  title: "Produtos",
};

const HomePage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  return (
    <Container>
      <ListaDeProdutos />
    </Container>
  );
};

export default HomePage;
