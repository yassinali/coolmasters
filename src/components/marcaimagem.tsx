"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import { Button } from "./ui/button";
import { Edit, ImageIcon, PlusCircle } from "lucide-react";
import { FileUpload } from "./fileUpload";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image"

interface MarcaImagemProps {
  marcaId: string;
  dadosIniciais: {
    imageUrl: string | null;
  };
}

const formSchema = z.object({
  imageUrl: z.string(),
});

export const MarcaImagem = ({ dadosIniciais,marcaId }: MarcaImagemProps) => {
  const [isEditing, setEditing] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    dadosIniciais.imageUrl,
  );
  const router = useRouter();

  // UseEffect para garantir que o componente seja montado corretamente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Função para alternar o estado de edição
  const toggleEdit = () => setEditing((current) => !current);

  const handleUploadComplete = (url?: string) => {
    if (url) {
      onSubmit({ imageUrl: url })
        .then(() => {
          setImageUrl(url);
        //  toast.success("Foto carregado com sucesso!");
  
          // Atualize o estado diretamente para refletir as mudanças imediatamente
          dadosIniciais.imageUrl = url; // Atualiza diretamente o estado da imagem
          toggleEdit();  // Alterna o estado de edição
          router.refresh();  // Força o refresh da página
          
  
        })
        .catch((error) => {
          console.error("Erro ao adicionar anexo:", error);
          toast.error("Erro ao adicionar o anexo.");
        });
    } else {
      console.error("Nenhuma URL recebida após o upload");
      toast.error("Erro ao receber URL do anexo.");
    }
  };
  
  

  // Função para enviar os dados para o backend
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/marcas/${marcaId}`, values);
    //  toast.success(response.data.message || "Dados atualizados com sucesso!");
      console.log("imagem carregada",response);
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

  // Evitar renderização antes de o componente ser montado
  if (!isMounted) return null

  return (
    <div className="mt-2 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Logomarca
        <Button onClick={toggleEdit} variant="ghost" className="mb-4">
          {isEditing ? (
            <>Cancelar</>
          ) : !imageUrl ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Carregar logo
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Alterar logo
            </>
          )}
        </Button>
      </div>

      {/* Quando não está em edição e não há imagem, mostramos o ícone */}
      {!isEditing && !imageUrl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        // A parte de renderização da imagem deve ser oculta quando estiver editando
        !isEditing && imageUrl && (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md"
              src={imageUrl || ""}
            />
          </div>
        )
      )}

      {/* Exibindo o formulário de upload quando em edição */}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="imageUrl"
            onChange={handleUploadComplete} // Chama a função handleUploadComplete no upload
          />
        </div>
      )}
    </div>
  )
}
