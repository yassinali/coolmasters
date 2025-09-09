"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImageIcon, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MultiFileUpload } from "@/components/multipleUpload";

interface ProdutoImagensFormProps {
  produtoId: string;
  dadosIniciais: {
    images?: Array<{
      id: string;
      imagesUrl: string;
      default: boolean;
    }>;
  };
}

type FormSchema = {
  imageUrl: string;
};

export const ProdutoImagensForm = ({
  dadosIniciais,
  produtoId,
}: ProdutoImagensFormProps) => {
  const [isEditing, setEditing] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const [images, setImages] = useState<
    Array<{
      id: string;
      imagesUrl: string;
      default: boolean;
    }>
  >(dadosIniciais.images || []);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleEdit = () => setEditing((current) => !current);

  const MAX_IMAGES = 6;
  const remainingSlots = MAX_IMAGES - images.length;

  const handleUploadComplete = async (urls: string[]) => {
    try {
      const urlsToProcess = urls.slice(0, remainingSlots);

      for (const url of urlsToProcess) {
        await onSubmit({ imageUrl: url });
      }

      const newImages = urlsToProcess.map((url, index) => ({
        id: `temp-${Date.now()}-${index}`,
        imagesUrl: url,
        default: images.length === 0 && index === 0,
      }));

      setImages((prev) => [...prev, ...newImages]);
      toggleEdit();
      toast.success(
        `${urlsToProcess.length} imagem(ns) adicionada(s) com sucesso!`,
      );

      if (urls.length > urlsToProcess.length) {
        toast.warning(
          `Apenas ${urlsToProcess.length} imagens foram adicionadas. Limite máximo: ${MAX_IMAGES}`,
        );
      }

      router.refresh();
    } catch (error) {
      console.error("Erro ao adicionar imagens:", error);
      toast.error("Erro ao adicionar as imagens.");
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    try {
      await axios.delete(`/api/products/${produtoId}/imagem/${imageId}`);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
      toast.success("Imagem removida com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(`Erro ao remover imagem: ${imageId}`, error);
      toast.error("Erro ao remover a imagem.");
    }
  };

  const handleSetDefault = async (imageId: string) => {
    try {
      await axios.patch(`/api/products/${produtoId}/imagem/${imageId}/default`);
      setImages((prev) =>
        prev.map((img) => ({
          ...img,
          default: img.id === imageId,
        })),
      );
      toast.success("Imagem padrão definida!");
      router.refresh();
    } catch (error) {
      console.error("Erro ao definir imagem padrão:", error);
      toast.error("Erro ao definir imagem padrão.");
    }
  };

  const onSubmit = async (values: FormSchema) => {
    try {
      await axios.post(`/api/products/${produtoId}/imagem`, values);
      console.log("Imagem carregada", values);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Erro ao atualizar os dados.",
        );
      } else {
        toast.error("Erro desconhecido.");
      }
      throw error;
    }
  };

  if (!isMounted) return null;

  return (
    <div className="mt-2 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        <div>
          <span>Imagens do Produto</span>
          <span className="ml-2 text-sm text-gray-600">
            ({images.length}/{MAX_IMAGES})
          </span>
        </div>
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="mb-4"
          disabled={images.length >= MAX_IMAGES}
        >
          {isEditing ? (
            <>Cancelar</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              {images.length >= MAX_IMAGES
                ? "Limite atingido"
                : `Carregar imagens (${remainingSlots} restantes)`}
            </>
          )}
        </Button>
      </div>

      {images.length === 0 ? (
        <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
          <ImageIcon className="h-10 w-10 text-slate-500" />
          <p className="ml-2 text-slate-500">Nenhuma imagem adicionada</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {images.map((image) => (
            <div key={image.id} className="group relative">
              <div className="relative aspect-square">
                <Image
                  alt="Imagem do produto"
                  fill
                  className="rounded-md object-cover"
                  src={image.imagesUrl || "/placeholder.svg"}
                />
                {image.default && (
                  <div className="absolute top-2 left-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                    Padrão
                  </div>
                )}
              </div>

              <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center gap-2 rounded-md bg-black opacity-0 transition-opacity group-hover:opacity-100">
                {!image.default && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleSetDefault(image.id)}
                  >
                    Definir como padrão
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditing && remainingSlots > 0 && (
        <div className="mt-4 text-black">
          <MultiFileUpload
            endpoint="imageUrl"
            onChange={handleUploadComplete}
            maxFiles={remainingSlots}
          />
          <p className="mt-2 text-sm text-gray-600">
            Você pode adicionar até {remainingSlots} imagem(ns) adicional(is).
          </p>
        </div>
      )}
    </div>
  );
};
