"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const items = [
  { title: "Slide 1", image: "logo_msit.png" },
  { title: "Slide 2", image: "logo_msit.png" },
  { title: "Slide 3", image: "logo_msit.png" },
];

export function FullWidthCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi]);

  return (
    <div className="w-full">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {items.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="relative h-96 bg-gray-200 rounded-md"> {/* Increased height */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute bottom-0 left-0 right-0 text-center text-white text-xl font-bold p-2">
                  {/* Positioned at the bottom and removed background */}
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
