"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function BannerCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  const slides = [
    "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhmlaZEJNjO7qBVA3xSMXdLgwUNR21nmKPjluJcp",
    "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhml4L7iDKPL9eqGlf8zRTCNpVK0ncHYU6FvtEwD",
    "https://kisrj7912y.ufs.sh/f/E1L3Kf9gGhml7tyWCrTZYM58omvRIVXDurgAKCe3BlPL6GtQ",
  ];

  return (
    <div className="w-full overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {slides.map((src, index) => (
          <div key={index} className="relative h-64 flex-[0_0_100%] md:h-96">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
