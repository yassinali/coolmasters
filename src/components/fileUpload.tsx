"use client";

import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string, name?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

// Interface segura para o objeto retornado pelo UploadDropzone
interface UploadedFile {
  ufsUrl?: string;
  fileUrl?: string;
  name?: string;
  fileName?: string;
  key?: string;
}

export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  useEffect(() => {
    if (uploadProgress === 100) {
      const timer = setTimeout(() => setIsUploaded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [uploadProgress]);

  return (
    <div>
      <UploadDropzone
        endpoint={endpoint}
        onUploadBegin={(fileName) => {
          console.log(`Iniciando upload de ${fileName}`);
          setUploadProgress(0);
          setIsUploaded(false);
        }}
        onUploadProgress={(progress) => {
          console.log(`Progresso do upload: ${progress}%`);
          setUploadProgress(progress);
        }}
        onClientUploadComplete={(res) => {
          console.log("Resposta completa do upload:", res);
          try {
            if (!res || res.length === 0) {
              console.error("Resposta vazia ou inválida:", res);
              toast.error("Upload concluído, mas resposta inválida");
              return;
            }

            const uploadedFile = res[0] as UploadedFile;
            console.log("File completo:", uploadedFile);

            const fileUrl = uploadedFile.ufsUrl || uploadedFile.fileUrl || "";
            const fileName =
              uploadedFile.name ||
              uploadedFile.fileName ||
              uploadedFile.key ||
              "arquivo_sem_nome";

            if (!fileUrl) {
              console.error("URL do arquivo não encontrada:", uploadedFile);
              toast.error("Upload concluído, mas URL não encontrada");
              return;
            }

            console.log(`Arquivo carregado: ${fileName}, URL: ${fileUrl}`);

            onChange(fileUrl, fileName);
            toast.success(`${fileName} carregado com sucesso!`);
            setUploadProgress(100);
          } catch (error) {
            console.error("Erro ao processar upload:", error);
            toast.error("Erro ao processar o upload");
          }
        }}
        onUploadError={(error: Error) => {
          console.error("Erro no upload:", error);
          toast.error(`Erro no upload: ${error.message || "Erro desconhecido"}`);
          setUploadProgress(0);
          setIsUploaded(false);
        }}
      />
      {(uploadProgress > 0 || isUploaded) && (
        <div className="mt-2">
          <div className="bg-blue-200 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center mt-1">
            {isUploaded ? "Upload concluído" : `${uploadProgress}% carregado`}
          </p>
        </div>
      )}
    </div>
  );
};
