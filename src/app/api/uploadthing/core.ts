import { getServerSession } from "@/lib/get-session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";


const f = createUploadthing();

const handleAuth = async () => {
    const session = await getServerSession();
    const user = session?.user;
  
  if (!user) throw new UploadThingError("Unauthorized");

  return { userId: user.id };
};

export const ourFileRouter = {
  imageUrl: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("File completo:", file); // Verificando a estrutura do file

        return {
          success: true,
          uploadedBy: metadata.userId,
          fileUrl: file.ufsUrl,
          fileName: file.name, // Pegando o nome do arquivo
        };
      } catch (error) {
        console.error("Erro no onUploadComplete:", error);
        return { success: false };
      }
    }),

  anexos: f(["text", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ file, metadata }) => {
      try {
        console.log("File completo:", file); // Verificando a estrutura do file

        return {
          success: true,
          uploadedBy: metadata.userId,
          fileUrl: file.ufsUrl,
          fileName: file.name, // Pegando o nome do arquivo
        };
      } catch (error) {
        console.error("Erro no onUploadComplete :", error);
        return { success: false };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
