import { Product as PrismaProduct, Images, Brand } from "@/generated/prisma";

export type ProductWithRelations = PrismaProduct & {
  images: Images[];
  brand: Brand | null;
};
