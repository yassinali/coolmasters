"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const ListaDeMarcas=()=>{
    const[marcasData, setMarcasData] = useState([]);
    const[loading, setLoading] = useState(true);
    const [error] = useState(null);

    useEffect(() =>{
        const fetchMarcas = async ()=>{
            try {
                const response = await fetch("/api/marcas");
                if(!response.ok){
                    throw new Error("Falha ao carregar as marcas");
                }

                const data = await response.json();
                setMarcasData(data);
            } catch (error) {
                console.error("Erro: ",error);
            } finally{
                setLoading(false);
            }
        };
        fetchMarcas();
    }, []);


    if (loading) {
        return (
            <><div className="mt-6 flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-6 w-64" />
                </div>
                <div className="flex flex-col gap-x-2 mr-10">
                    <Skeleton className="h-10 w-24" />
                </div>
            </div><div className="gap-6 mt-16 pr-10">
                    <div className="flex items-center gap-x-2">
                        <Skeleton className="h-8 w-40" />
                    </div>
                    <div className="w-full mt-4">
                        <div className="overflow-x-auto w-full">
                            <Skeleton className="h-40 w-full" />
                        </div>
                    </div>
                </div></>
        );
    }
    
  
    if (error) {
        return <div>Erro: {error}</div>;
    }
  

    return(
        <div className="pl-6">
            <div className="mt-6 flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Marcas oficiais</h1>
            </div>
            <div className="flex flex-col gap-x-2 mr-10">
                <Link href={"/marcas/nova"}>
                    <Button
                    variant={"ghost"}
                    size={"sm"}
                    >
                        <PlusCircle className="size-4"/>
                        <p className="text-2xl font-medium">Novo</p>
                    </Button>
                </Link>
            </div>
            </div>
            <div className="gap-6 mt-16 pr-10">
               
                <div className="w-full mt-4">
                    <div className="overflow-x-auto w-full">
                    <DataTable columns={columns} data={marcasData} filterKey="title" />

                    </div>
                </div>
            </div>
        </div>
    )
}