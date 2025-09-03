"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Edit, ImageIcon, PlusCircle } from "lucide-react";
import { FileUpload } from "./fileUpload";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";

interface MarcaImagemProps {
  marcaId: string;
  dadosIniciais: {
    imageUrl: string | null;
  };
}

// Definindo apenas o tipo para evitar warnings do ESLint
type FormSchema = {
  imageUrl: string;
};

export const MarcaImagem = ({ dadosIniciais, marcaId }: MarcaImagemProps) => {
  const [isEditing, setEditing] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(dadosIniciais.imageUrl);
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
      await axios.patch(`/api/marcas/${marcaId}`, values);
      console.log("Imagem carregada", values);
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

  if (!isMounted) return null;

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
              <Edit className="h-4 w-4 mr-2" /> Alterar logo
            </>
          )}
        </Button>
      </div>

      {!isEditing && !imageUrl ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
          <ImageIcon className="h-10 w-10 text-slate-500" />
        </div>
      ) : (
        !isEditing &&
        imageUrl && (
          <div className="relative aspect-video mt-2">
            <Image alt="upload" fill className="object-cover rounded-md" src={imageUrl} />
          </div>
        )
      )}

      {isEditing && (
        <div>
          <FileUpload endpoint="imageUrl" onChange={handleUploadComplete} />
        </div>
      )}
    </div>
  );
};
