import Container from "@/components/Container";
import { Title } from "@/components/text";
import prisma from "@/lib/prisma";
import CategoryProduct from "../../_components/categoryProduct";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });
  const { slug } = await params;

  return (
    <div className="py-1">
      <Container>
        <Title>
          Produtos por categoria:{" "}
          <span className="text-shop_light_green font-bold tracking-wide capitalize">
            {slug && slug}
          </span>
        </Title>
        <CategoryProduct categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
