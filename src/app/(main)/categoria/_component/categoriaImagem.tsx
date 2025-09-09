"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Edit, ImageIcon, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/fileUpload";

interface CategoriaImagemProps {
  categoriaId: string;
  dadosIniciais: {
    imageUrl: string | null;
  };
}

// Definindo apenas o tipo para evitar warnings do ESLint
type FormSchema = {
  imageUrl: string;
};

export const CategoriaImagem = ({
  dadosIniciais,
  categoriaId,
}: CategoriaImagemProps) => {
  const [isEditing, setEditing] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    dadosIniciais.imageUrl,
  );
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleEdit = () => setEditing((current) => !current);

  const handleUploadComplete = (url?: string) => {
    if (url) {
      onSubmit({ imageUrl: url })
        .then(() => {
          setImageUrl(url);
          dadosIniciais.imageUrl = url;
          toggleEdit();
          router.refresh();
        })
        .catch((error) => {
          console.error("Erro ao adicionar anexo:", error);
          toast.error("Erro ao adicionar o anexo.");
        });
    } else {
      toast.error("Erro ao receber URL do anexo.");
    }
  };

  const onSubmit = async (values: FormSchema) => {
    try {
      await axios.patch(`/api/categoria/${categoriaId}`, values);
      console.log("Imagem carregada", values);
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

  if (!isMounted) return null;

  return (
    <div className="mt-2 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Logomarca
        <Button onClick={toggleEdit} variant="ghost" className="mb-4">
          {isEditing ? (
            <>Cancelar</>
          ) : !imageUrl ? (
            <>
              <PlusCircle className="mr-2 h-4 w-4" /> Carregar logo
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" /> Alterar logo
            </>
          )}
        </Button>
      </div>

      {!isEditing && !imageUrl ? (
        <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        !isEditing &&
        imageUrl && (
          <div className="relative mt-2 aspect-video">
            <Image
              alt="upload"
              fill
              className="rounded-md object-cover"
              src={imageUrl}
            />
          </div>
        )
      )}

      {isEditing && (
        <div className="text-black">
          <FileUpload endpoint="imageUrl" onChange={handleUploadComplete} />
        </div>
      )}
    </div>
  );
};
