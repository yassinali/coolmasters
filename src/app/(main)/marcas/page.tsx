import Container from "@/components/Container";
import { ListaDeMarcas } from "@/components/listaDeMarcas";
import { getServerSession } from "@/lib/get-session";
import { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Marcas",
};

const Marcas = async() => {

      const session = await getServerSession();
      const user = session?.user;
    
      if (!user) unauthorized();
      
  return (
    <Container>
      <ListaDeMarcas/>
    </Container>
  );
};

export default Marcas;
