import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil } from "lucide-react";

import Link from "next/link";
import { Product } from "@/generated/prisma";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Produtos
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      const description = row.original.description ?? "";
      return (
        <div
          className="text-sm break-words"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </div>
      );
    },
  },

  {
    accessorKey: "categories",
    header: "Categoria",
    cell: ({ row }) => {
      const categories =
        (row.original as Product & { categories?: { title: string }[] })
          .categories ?? [];
      return (
        <span>
          {categories.length > 0
            ? categories.map((category) => category.title).join(", ")
            : "Sem categoria"}
        </span>
      );
    },
  },
  {
    accessorKey: "brand.title",
    header: "Marca",
  },
  {
    id: "actions",
    header: "Acções", // Título da coluna
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link
            href={`/produtos/${id}`}
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
