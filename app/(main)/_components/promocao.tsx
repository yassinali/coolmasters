import Image from "next/image"

export const Promocao = () => {
  const promocaoItems = [
    {
      id: 1,
      image: "/promo1.webp",
      alt: "Promoção 1",
    },
    {
      id: 2,
      image: "/promo2.webp",
      alt: "Promoção 2",
    },
    {
      id: 3,
      image: "/promo1.webp",
      alt: "Promoção 3",
    },
    {
      id: 4,
      image: "/promo2.webp",
      alt: "Promoção 4",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {promocaoItems.map((item) => (
          <div key={item.id} className="overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              width={800}
              height={800}
              alt={item.alt}
              className="w-full h-80 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
