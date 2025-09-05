"use client";

import Container from "@/components/Container";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema para validação do formulário
const formSchema = z.object({
  name: z.string().min(1, { message: "Campo obrigatório" }),
  description: z.string().min(1, { message: "Campo obrigatório" }),
  // Como um produto pode ter várias categorias, estamos validando um array de strings
  categories: z
    .array(z.string())
    .min(1, { message: "Selecione pelo menos uma categoria" }),
  // O brandId agora é opcional, conforme o seu modelo
  brandId: z.string().optional(),
});

// Interface para o modelo de Categoria
interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order: number | null;
  featured: boolean;
  imageUrl: string | null;
}

interface Brand {
  id: string;
  title: string;
}

export const NovoProduto = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      categories: [],
      brandId: undefined, // undefined para campos opcionais
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UseEffect para buscar as categorias e marcas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axios.get("/api/categoria"),
          axios.get("/api/marcas"),
        ]);

        if (categoriesRes.status !== 200 || brandsRes.status !== 200) {
          throw new Error("Erro ao buscar dados.");
        }

        setCategories(categoriesRes.data);
        setBrands(brandsRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar categorias ou marcas.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/products", values);
      const produtoId = response.data.id;
      if (produtoId) {
        router.push(`/produtos/${produtoId}`);
        toast.success("Produto registrado com sucesso.");
      } else {
        throw new Error("ID do produto não encontrado na resposta.");
      }
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      toast.error("Algo deu errado: " + (error as Error).message);
    }
  };

  if (isLoading) {
    return (
      <Container className="flex items-center justify-center p-20">
        <p>Carregando...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="flex items-center justify-center p-20">
        <p className="text-red-500">{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="w-full rounded-md bg-white p-6 shadow-md md:p-8">
        <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
          Registro de Produtos
        </h1>
        <p className="text-md mb-6 text-center text-gray-600">
          Preencha todos os dados para registrar o produto
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descrição do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categorias */}
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorias</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange([value])} // Simula seleção única, para seleção múltipla seria diferente
                      value={field.value[0]}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marca (Brand) */}
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6 flex items-center justify-between">
              <Link href="/produtos">
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Aguarde..." : "Gravar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Container>
  );
};

export default NovoProduto;
