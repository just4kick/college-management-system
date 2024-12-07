"use client";

import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const items = [
  { title: "Slide 1", image: "b.jpg" },  // Make sure paths are correct
  { title: "Slide 2", image: "coverImage.jpg" },
  { title: "Slide 3", image: "b.jpg" },
];

export function FullWidthCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      speed: 10,
      align: "center", // Optionally adjust alignment
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

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
