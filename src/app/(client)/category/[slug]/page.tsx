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
    // where: {
    //   slug: (await params).slug,
    // },

    orderBy: { id: "desc" },
  });
  const { slug } = await params;

  return (
    <div className="py-10">
      <Container>
        <Title>
          Produtos por categoria:{" "}
          <span className="font-bold tracking-wide text-green-600 capitalize">
            {slug && slug}
          </span>
        </Title>
        <CategoryProduct categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
