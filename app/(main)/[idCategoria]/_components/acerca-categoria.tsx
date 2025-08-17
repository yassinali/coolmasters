export const AcercaCategoria = ({ idCategoria }: { idCategoria: string }) => {
  // transforma "ar-condicionado-midea" em "Ar Condicionado Midea"
  const formatarCategoria = (texto: string) => {
    return texto
      .split("-") // separa por "-"
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1)) // coloca primeira letra maiúscula
      .join(" "); // junta com espaço
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-gray-500">
        {formatarCategoria(idCategoria)}
      </h2>
    </div>
  );
}