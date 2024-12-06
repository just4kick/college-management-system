"use client";

import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClubCards() {
  const [emblaClub1Ref, emblaClub1] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });
  const [emblaClub2Ref, emblaClub2] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });
  const [emblaClub3Ref, emblaClub3] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });
  const [emblaClub4Ref, emblaClub4] = useEmblaCarousel({ loop: true, skipSnaps: false, align: "center" });

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

  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      images: ["/nba.png", "/a.jpg", "/coding3.jpg"],
    },
    {
      id: 2,
      name: "Robotics Club",
      images: ["/nba.png", "/a.jpg", "/nba.png"],
    },
    {
      id: 3,
      name: "Music Club",
      images: ["/nba.png", "/a.jpg", "/nba.png"],
    },
    {
      id: 4,
      name: "Photography Club",
      images: ["/nba.png", "/a.jpg", "/nba.png"],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Our Clubs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clubs.map((club, index) => {
          const emblaRef =
            index === 0
              ? emblaClub1Ref
              : index === 1
              ? emblaClub2Ref
              : index === 2
              ? emblaClub3Ref
              : emblaClub4Ref;
          const emblaInstance =
            index === 0
              ? emblaClub1
              : index === 1
              ? emblaClub2
              : index === 2
              ? emblaClub3
              : emblaClub4;

          return (
            <Card
              key={club.id}
              className="h-full bg-white dark:bg-gray-800 shadow-md"
            >
              <CardHeader>
                <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                  {club.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div ref={emblaRef} className="embla">
                    <div className="embla__container">
                      {club.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="embla__slide flex justify-center items-center"
                        >
                          <img
                            src={image}
                            alt={`${club.name} ${imgIndex + 1}`}
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

export default ClubCards;
