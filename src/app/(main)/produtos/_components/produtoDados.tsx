"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatorio" }),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  status: z.string().optional(),
});

interface ProdutoDadosFormProps {
  dadosIniciais: {
    name: string;
    description: string;
    slug: string;
    brandId?: string | null;
    categories?: string | null;
    status?: string | null;
  };
  produtoId: string;
}

export const ProdutoDadosForm = ({
  dadosIniciais,
  produtoId,
}: ProdutoDadosFormProps) => {
  const [isEditing, setEditing] = useState(false);
  const router = useRouter();

  // Função para alternar o modo de edição
  const toggleEdit = () => setEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: dadosIniciais.name || "",
      description: dadosIniciais.description || "",
      //imageUrl: dadosIniciais.imageUrl || "",
    },
  });

  // Atualiza os valores do formulário se os dados iniciais mudarem
  useEffect(() => {
    form.reset({
      title: dadosIniciais.name || "",
      description: dadosIniciais.description || "",
      // imageUrl: dadosIniciais.imageUrl || "",
    });
  }, [dadosIniciais, form]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/products/${produtoId}`, values);
      toast.success(response.data.message || "Dados atualizados com sucesso!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Erro ao atualizar os dados.",
        );
      } else {
        toast.error("Erro desconhecido.");
      }
    }
  };

  return (
    <div className="mt-2 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Dados da marca
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            "Cancelar"
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </>
          )}
        </Button>
      </div>

      {!isEditing ? (
        <>
          <p className="mt-2 text-sm">Titulo: {dadosIniciais.name || "-"}</p>
          <p className="mt-2 text-sm">
            Descrição: {dadosIniciais.description || "-"}
          </p>
        </>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-4"
          >
            {/* Nome */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do aluno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup>
                      <div className="mt-2 flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="active"
                            checked={field.value === "new"}
                            onChange={() => field.onChange("new")}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label className="text-sm font-medium text-gray-700">
                            Novidades
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            value="inactive"
                            checked={field.value === "hot"}
                            onChange={() => field.onChange("hot")}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label className="text-sm font-medium text-gray-700">
                            Mais vendidos
                          </label>
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  <p className="text-muted">Aguarde...</p>
                </>
              ) : (
                "Gravar"
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
