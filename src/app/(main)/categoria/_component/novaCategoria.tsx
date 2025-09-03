"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, { message: "o titulo é obrigatorio" }),
  slug: z.string().optional(),
  description: z.string().optional(),
});
export const NovaCategoriaCreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
    },
  });

  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/categoria", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const categoriaId = response.data.id;
      toast.success(response.data.message || "Categoria criada com sucesso");
      router.push(`/categoria/${categoriaId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Erro ao comunicar com o servidor.";
        toast.error(errorMessage);
      } else {
        toast.error("Algo deu errado. Por favor, tente novamente.");
      }
    }
  };

  return (
    <div>
        <div>
            <h1>Criar categoria</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                    control={form.control}
                    name="title"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input placeholder="Escrever o titulo" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                      <FormField
                    control={form.control}
                    name="description"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Descricao</FormLabel>
                            <FormControl>
                                <Input placeholder="Escrever o titulo" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={isSubmitting || !isValid}>
                      {isSubmitting ? (
                        <>
                        <Loader2 className="animate-spin h-4 w-4"/>
                        <p className="text-muted-foreground">Gravando...</p>
                        </>
                      ):(
                        "Gravar"
                      )}
                      </Button>
                </form>
            </Form>
        </div>
    </div>
  )
};
