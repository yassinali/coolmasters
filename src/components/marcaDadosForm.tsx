'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import { Loader2, Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


const formSchema = z.object({
  title: z.string().min(1,{message:"Campo obrigatorio"}),
  description: z.string().optional(),
  imageUrl: z.string().optional()
});

interface MarcaDadosFormProps {
  dadosIniciais: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  marcaId: string;
}

export const MarcaDadosForm = ({ dadosIniciais, marcaId }: MarcaDadosFormProps) => {
  const [isEditing, setEditing] = useState(false);
  const router = useRouter();

  // Função para alternar o modo de edição
  const toggleEdit = () => setEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: dadosIniciais.title || "",
      description: dadosIniciais.description || "",
      imageUrl: dadosIniciais.imageUrl || "",
    },
  });

  // Atualiza os valores do formulário se os dados iniciais mudarem
  useEffect(() => {
    form.reset({
      title: dadosIniciais.title || "",
      description: dadosIniciais.description || "",
      imageUrl: dadosIniciais.imageUrl || "",
    });
  }, [dadosIniciais, form]);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/marcas/${marcaId}`, values);
      toast.success(response.data.message || "Dados atualizados com sucesso!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Erro ao atualizar os dados.");
      } else {
        toast.error("Erro desconhecido.");
      }
    }
  };

  return (
    <div className="mt-2 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Dados da marca
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? "Cancelar" : <><Pencil className="h-4 w-4 mr-2" />Editar</>}
        </Button>
      </div>

      {!isEditing ? (
        <>
          <p className="text-sm mt-2">Titulo: {dadosIniciais.title || "-"}</p>
          <p className="text-sm mt-2">Descrição: {dadosIniciais.description || "-"}</p>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
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
            {/* Apelido */}
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
            
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> <p className="text-muted">Aguarde...</p>
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
