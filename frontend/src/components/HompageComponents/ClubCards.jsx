import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ClubCards() {
  const clubs = [
    {
      id: 1,
      name: "Coding Club",
      images: ["/nba.png", "/a.jpg", "/nba.png"],
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
      <h2 className="text-2xl font-bold text-center mb-8">Our Clubs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
}

function ClubCard({ club }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    if (embla) {
      const updateButtons = () => {
        setPrevDisabled(!embla.canScrollPrev());
        setNextDisabled(!embla.canScrollNext());
      };

      embla.on("select", updateButtons);
      updateButtons();
    }
  }, [embla]);

  const onPrevClick = () => embla && embla.scrollPrev();
  const onNextClick = () => embla && embla.scrollNext();

  return (
    <Card className="h-full bg-white dark:bg-gray-800 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-gray-900 dark:text-gray-100">{club.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div ref={emblaRef} className="embla">
            <div className="embla__container">
              {club.images.map((image, index) => (
                <div key={index} className="embla__slide flex justify-center items-center">
                  <img
                    src={image}
                    alt={`${club.name} ${index + 1}`}
                    className="w-4/5 h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={onPrevClick}
            disabled={prevDisabled}
            className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full shadow-md transition-colors ${
              prevDisabled
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-200 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            &larr;
          </button>
          <button
            onClick={onNextClick}
            disabled={nextDisabled}
            className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full shadow-md transition-colors ${
              nextDisabled
                ? "bg-gray-300 text-gray-500"
                : "bg-gray-200 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            }`}
          >
            &rarr;
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ClubCards;
