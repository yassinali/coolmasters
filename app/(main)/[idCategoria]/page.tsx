import { Footer } from "@/components/footer";
import { CarouselPage } from "../_components/carousel";
import { Breadcrumbs } from "./_components/breadcrumbs";
import { PerguntasFrequentes } from "./_components/perguntas-frequentes";
import { AcercaCategoria } from "./_components/acerca-categoria";

interface CategoriaIdPageProps {
  params: Promise<{ idCategoria: string }>;
}

const CategoriaIdPage = async ({ params }: CategoriaIdPageProps) => {
  const { idCategoria } = await params;
  return (
    <div className="min-h-screen bg-gray-10">
      <div className="container mx-auto">
        <div className="flex justify-center items-center mt-10 mb-10">
          <CarouselPage />
        </div>
        <div>
            <Breadcrumbs idCategoria={idCategoria}/>
        </div>
        <AcercaCategoria idCategoria={idCategoria} />
        <PerguntasFrequentes/>
        <Footer />
      </div>
    </div>
  );
};

export default CategoriaIdPage;
