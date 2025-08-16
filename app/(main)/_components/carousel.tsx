import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const CarouselPage = () => {
  return (
    <div>
      <Carousel>
        <CarouselContent>
          <CarouselItem>......1......</CarouselItem>
          <CarouselItem>......2......</CarouselItem>
        
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
