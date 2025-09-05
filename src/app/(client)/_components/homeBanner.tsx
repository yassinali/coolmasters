"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Title } from "@/components/text";

export default function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const slides = [
    {
      title:
        "Até 15% de desconto nos melhores <br /> electrodomésticos para a sua casa",
      button: { text: "Comprar agora", href: "/comprar" },
      image:
        "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhmlaZEJNjO7qBVA3xSMXdLgwUNR21nmKPjluJcp",
    },
    {
      title: "Promoções imperdíveis em electrodomésticos <br /> e portáteis",
      button: { text: "Ver ofertas", href: "/comprar" },
      image:
        "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhml4L7iDKPL9eqGlf8zRTCNpVK0ncHYU6FvtEwD",
    },
    {
      title: "Os melhores electrodomésticos <br /> com entrega rápida",
      button: { text: "Explorar agora", href: "/comprar" },
      image:
        "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhml7tyWCrTZYM58omvRIVXDurgAKCe3BlPL6GtQ",
    },
  ];

  // Funções para controlar setas
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide relative flex flex-[0_0_100%] items-center justify-between bg-gray-50 px-6 py-10 md:h-96 md:px-16"
            >
              <div className="max-w-lg">
                <Title className="mb-5">
                  <span dangerouslySetInnerHTML={{ __html: slide.title }} />
                </Title>
                <Link
                  href={slide.button.href}
                  className="bg-shop_dark_green/90 hover:bg-shop_dark_green hoverEffect rounded-md px-5 py-2 text-sm font-semibold text-white/90 hover:text-white"
                >
                  {slide.button.text}
                </Link>
              </div>

              <div className="relative hidden h-64 w-96 md:inline-flex md:h-80">
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de navegação */}
      <button
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
      >
        ◀
      </button>
      <button
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow-md hover:bg-white"
      >
        ▶
      </button>
    </div>
  );
}
