"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "./data-table";
import { columns } from "@/app/(main)/categoria/_component/columns";

export const ListaDeCategorias = () => {
  const [categoriasData, setCategoriasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("/api/categoria");
        if (!response.ok) {
          throw new Error("Falha ao carregar as categorias");
        }

        const data = await response.json();
        setCategoriasData(data);
      } catch (error) {
        console.error("Erro: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
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
          <h1 className="text-2xl font-medium">Categorias</h1>
        </div>
        <div className="mr-10 flex flex-col gap-x-2">
          <Link href={"/categoria/nova"}>
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
            <DataTable
              columns={columns}
              data={categoriasData}
              filterKey="title"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
