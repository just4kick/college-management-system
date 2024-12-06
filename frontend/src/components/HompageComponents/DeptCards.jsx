"use client";

import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export function DeptCards() {
  const [emblaCARef, emblaCA] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });
  const [emblaBTechRef, emblaBTech] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });
  const [emblaCSBSRef, emblaCSBS] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });

  const updateButtons = useCallback((emblaInstance, setPrevDisabled, setNextDisabled) => {
    if (!emblaInstance) return;
    setPrevDisabled(!emblaInstance.canScrollPrev());
    setNextDisabled(!emblaInstance.canScrollNext());
  }, []);

  const onPrevClick = (emblaInstance) => () => {
    if (!emblaInstance) return;
    emblaInstance.scrollPrev();
  };

  const onNextClick = (emblaInstance) => () => {
    if (!emblaInstance) return;
    emblaInstance.scrollNext();
  };

  const departments = [
    {
      id: 1,
      name: "Computer Application",
      images: ["/nba.png", "/a.jpg", "/nba.png"],
    },
    {
      id: 2,
      name: "B.Tech",
      images: ["/nba.png", "/nba.png", "/nba.png"],
    },
    {
      id: 3,
      name: "CSBS",
      images: ["/nba.png", "/nba.png", "/nba.png"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
  Our Departments
</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept, index) => {
          const emblaRef =
            index === 0 ? emblaCARef : index === 1 ? emblaBTechRef : emblaCSBSRef;
          const emblaInstance =
            index === 0 ? emblaCA : index === 1 ? emblaBTech : emblaCSBS;

          return (
            <Card
              key={dept.id}
              className="h-full bg-white dark:bg-gray-800 shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                  {dept.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div ref={emblaRef} className="embla">
                    <div className="embla__container">
                      {dept.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="embla__slide flex justify-center items-center"
                        >
                          <img
                            src={image}
                            alt={`${dept.name} ${imgIndex + 1}`}
                            className="w-4/5 h-48 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={onPrevClick(emblaInstance)}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
                  >
                    &larr;
                  </button>
                  <button
                    onClick={onNextClick(emblaInstance)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
                  >
                    &rarr;
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default DeptCards;
