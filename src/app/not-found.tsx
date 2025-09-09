import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-10 sm:px-6 md:py-32 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo />

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Página não encontrada
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Lamentamos, mas a página que procura não existe ou foi removida.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <Link
              href="/"
              className="bg-shop_dark_green/80 hover:bg-shop_dark_green focus:ring-amazonOrangeDark hoverEffect flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-semibold text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Voltar à página inicial
            </Link>
            <Link
              href="/help"
              className="text-amazonBlue focus:ring-amazonBlue flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              Obter ajuda
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Precisa de assistência? Visite a secção de ajuda ou contacte-nos
            para suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
