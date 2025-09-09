import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, EyeIcon, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/produtos/${id}`} passHref>
              <DropdownMenuItem className="cursor-pointer">
                <EyeIcon className="mr-2 h-4 w-4" /> Ver
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
