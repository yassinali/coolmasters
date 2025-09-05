import { Metadata } from "next";
import { NovoProduto } from "../_components/novoProduto";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Novo produto",
};
const HomePage = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  return <NovoProduto />;
};

export default HomePage;
