import Link from "next/link";

export const Breadcrumbs = ({ idCategoria }: { idCategoria: string }) => {
  // transforma "ar-condicionado-midea" em "Ar Condicionado Midea"
  const formatarCategoria = (texto: string) => {
    return texto
      .split("-") // separa por "-"
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1)) // coloca primeira letra maiúscula
      .join(" "); // junta com espaço
  };

  return (
    <nav className="bg-white p-4">
      <ol className="list-reset flex text-gray-700">
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li className="mx-2">/</li>
        <li>
          <span className="text-gray-500">{formatarCategoria(idCategoria)}</span>
        </li>
      </ol>
    </nav>
  );
};
