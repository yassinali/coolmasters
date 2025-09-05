import prisma from "@/lib/prisma";
import Link from "next/link";

export const FooterCategorias = async () => {
  const categoriesData = await prisma.category.findMany({
    take: 6,
    skip: 0,
    select: { title: true, slug: true },
  });
  return (
    <div>
      {categoriesData.map((item) => (
        <li key={item.title}>
          <Link
            href={`/category/${item.slug}`}
            className="hover:text-shop_light_green hoverEffect font-medium"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </div>
  );
};
