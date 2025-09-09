"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { FileUpload } from "@/components/fileUpload";

interface MultipleImageUploadProps {
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

export const MultipleImageUpload = ({
  onImagesChange,
  maxImages = 5,
  existingImages = [],
}: MultipleImageUploadProps) => {
  const [images, setImages] = useState<string[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (url?: string) => {
    if (url) {
      if (images.length >= maxImages) {
        toast.error(`Máximo de ${maxImages} imagens permitidas`);
        return;
      }

      const newImages = [...images, url];
      setImages(newImages);
      onImagesChange(newImages);
      toast.success("Imagem adicionada com sucesso!");
    }
    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
    toast.success("Imagem removida");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Imagens ({images.length}/{maxImages})
        </h3>
        {images.length < maxImages && (
          <Button
            onClick={() => setIsUploading(true)}
            variant="outline"
            size="sm"
          >
            <Upload className="mr-2 h-4 w-4" />
            Adicionar Imagem
          </Button>
        )}
      </div>

      {/* Grid de imagens existentes */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((url, index) => (
            <div key={index} className="group relative">
              <div className="relative aspect-square">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Imagem ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
                <Button
                  onClick={() => removeImage(index)}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload component */}
      {isUploading && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6">
          <FileUpload endpoint="imageUrl" onChange={handleImageUpload} />
          <Button
            onClick={() => setIsUploading(false)}
            variant="ghost"
            className="mt-2 w-full"
          >
            Cancelar
          </Button>
        </div>
      )}

      {images.length === 0 && !isUploading && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <p className="mb-4 text-gray-500">Nenhuma imagem adicionada</p>
          <Button onClick={() => setIsUploading(true)}>
            Adicionar primeira imagem
          </Button>
        </div>
      )}
    </div>
  );
};
