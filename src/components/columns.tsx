import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";

import Link from "next/link";
import { Brand } from "@/generated/prisma";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Marca
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: "Descricao",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "Acções", // Título da coluna
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/marcas/${id}`}
            className="hover:text-shop_light_green flex items-center gap-1 hover:underline"
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Link>
        </div>
      );
    },
  },
];
