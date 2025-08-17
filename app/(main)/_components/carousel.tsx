/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import path from "path"

export const CarouselPage = () => {
  const slides = [
    {
      id: 1,
      image: "/modern-stainless-steel-refrigerator.png",
      path: "/refrigerators",
    },
    {
      id: 2,
      image: "/white-split-ac.png",
      path: "/air-conditioners",
    },
    {
      id: 3,
      image: "/modern-digital-microwave.png",
      path: "/microwaves",
    },
    {
      id: 4,
      image: "/modern-5-burner-gas-stove.png",
      path: "/gas-stoves",
    },
    {
      id: 5,
      image: "/compact-dishwasher.png",
      path: "/dishwashers",
    },
  ]

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-[500px] overflow-hidden">
                <Link href={slide.path} className="w-full h-full block">
                 <img
                  src={slide.image || "/placeholder.svg"}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover"
                />
                </Link>
               
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 bg-neutral border-none text-black hover:bg-blue-500/30 hover:text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
          <ChevronLeft className="w-6 h-6" />
        </CarouselPrevious>
        <CarouselNext className="right-4  bg-neutral border-none text-black hover:bg-blue-500/30 hover:text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
          <ChevronRight className="w-6 h-6" />
        </CarouselNext>
      </Carousel>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-500 cursor-pointer transition-colors"
          />
        ))}
      </div>
    </div>
  )
}
