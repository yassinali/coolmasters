"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

export const ListaDeProdutos = () => {
  const [produtoData, setProdutosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Falha ao carregar os produtos");
        }

        const data = await response.json();
        setProdutosData(data);
      } catch (error) {
        console.error("Erro: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMarcas();
  }, []);

  if (loading) {
    return (
      <>
        <div className="mt-6 flex w-full items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div className="mr-10 flex flex-col gap-x-2">
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
        <div className="mt-16 gap-6 pr-10">
          <div className="flex items-center gap-x-2">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="mt-4 w-full">
            <div className="w-full overflow-x-auto">
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="pl-6">
      <div className="mt-6 flex w-full items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Nossos produtos</h1>
        </div>
        <div className="mr-10 flex flex-col gap-x-2">
          <Link href={"/produtos/novo"}>
            <Button variant={"ghost"} size={"sm"}>
              <PlusCircle className="size-4" />
              <p className="text-2xl font-medium">Novo</p>
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-16 gap-6 pr-10">
        <div className="mt-4 w-full">
          <div className="w-full overflow-x-auto">
            <DataTable columns={columns} data={produtoData} filterKey="name" />
          </div>
        </div>
      </div>
    </div>
  );
};
