"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";

interface MultiFileUploadProps {
  onChange: (urls: string[]) => void;
  endpoint: keyof typeof ourFileRouter;
  maxFiles?: number;
}

export const MultiFileUpload = ({
  onChange,
  endpoint,
}: MultiFileUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (uploadProgress === 100) {
      const t = setTimeout(() => setIsUploaded(true), 500);
      return () => clearTimeout(t);
    }
  }, [uploadProgress]);

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        // A propriedade 'maxFileCount' foi removida, pois não é válida aqui.
        // O limite de arquivos é gerenciado pela lógica do componente pai.
        config={
          {
            // Outras configurações (como 'mode' ou 'appendOnPaste') podem ir aqui.
          }
        }
        appearance={{
          container: "text-black",
          uploadIcon: { color: "black" },
          label: { color: "black" },
          allowedContent: { color: "black" },
          button: { color: "black" },
        }}
        onUploadBegin={() => {
          setUploadProgress(0);
          setIsUploaded(false);
        }}
        onUploadProgress={(p) => setUploadProgress(p)}
        onClientUploadComplete={(res) => {
          try {
            if (!res || res.length === 0) {
              toast.error("Upload concluído, mas resposta inválida");
              return;
            }

            const urls = res.map((file) => file.url).filter(Boolean);

            if (urls.length === 0) {
              toast.error(
                "Upload concluído, mas nenhuma URL válida encontrada",
              );
              return;
            }

            onChange(urls);
            toast.success(
              `${urls.length} arquivo(s) carregado(s) com sucesso!`,
            );
            setUploadProgress(100);
          } catch {
            toast.error("Erro ao processar o upload");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(
            `Erro no upload: ${error.message || "Erro desconhecido"}`,
          );
          setUploadProgress(0);
          setIsUploaded(false);
        }}
      />

      {(uploadProgress > 0 || isUploaded) && (
        <div className="mt-2">
          <div className="h-2 rounded-full bg-blue-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="mt-1 text-center text-sm text-black">
            {isUploaded ? "Upload concluído" : `${uploadProgress}% carregado`}
          </p>
        </div>
      )}
    </div>
  );
};
