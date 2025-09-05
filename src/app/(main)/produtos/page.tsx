import Container from "@/components/Container";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Produtos",
};

const HomePage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();
  return <Container>Homepage produtos</Container>;
};

export default HomePage;
