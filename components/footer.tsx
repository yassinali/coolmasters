import { Facebook, InstagramIcon, LinkedinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const opcoesDestaque = [
    { name: "Ar Condicionado Midea", path: "/ar-condicionado-midea" },
    { name: "Eletrodomésticos Midea", path: "/electrodomesticos" },
    { name: "Soluções de Energia Midea", path: "/solucoes-de-energia-midea" },
  ];
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {opcoesDestaque.map((menu, index) => (
                <div key={index}>
                  <Link
                    href={menu.path}
                    className="hover:underline"
                  >
                    {menu.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Central de Ajuda</div>
              <div>Garantia</div>
              <div>Assistência Técnica</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sobre a Coolmasters</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Nossa História</div>
              <div>Sustentabilidade</div>
              <div>Trabalhe Conosco</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Atendimento Oficial</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>< a href="tel: 258 82 333 3369">📞 258 82 333 3369</a></div>
              <div><a href="mailto:geral@coolmasters.com<">📧 geral@coolmasters.com</a></div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Patrocinador Oficial</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <Image src={`/partner.png`} alt="" height={40} width={250} />
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex gap-5 justify-center md:justify-start">
            <Link
              href="https://www.facebook.com/profile.php?id=61573900937008"
              target="_blank"
            >
              <Facebook className="size-5 hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.instagram.com/coolmasters.mz/"
              target="_blank"
            >
              <InstagramIcon className="size-5 hover:text-blue-400" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/coolmasters-mz/"
              target="_blank"
            >
              <LinkedinIcon className="size-5 hover:text-blue-400" />
            </Link>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-foreground">
              © 2024 CoolMasters Livance SA partner. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
