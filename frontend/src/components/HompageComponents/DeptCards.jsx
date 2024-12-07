"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DeptCards() {
  const [emblaCARef, emblaCA] = useEmblaCarousel({ loop: true, align: "center" });
  const [emblaBTechRef, emblaBTech] = useEmblaCarousel({ loop: true, align: "center" });
  const [emblaCSBSRef, emblaCSBS] = useEmblaCarousel({ loop: true, align: "center" });

  const [caButtonsDisabled, setCAButtonsDisabled] = useState({ prev: true, next: true });
  const [bTechButtonsDisabled, setBTechButtonsDisabled] = useState({ prev: true, next: true });
  const [csbsButtonsDisabled, setCSBSButtonsDisabled] = useState({ prev: true, next: true });

  const updateButtons = useCallback((emblaInstance, setButtonsDisabled) => {
    if (!emblaInstance) return;
    setButtonsDisabled({
      prev: !emblaInstance.canScrollPrev(),
      next: !emblaInstance.canScrollNext(),
    });
  }, []);

  useEffect(() => {
    if (emblaCA) {
      updateButtons(emblaCA, setCAButtonsDisabled);
      emblaCA.on("select", () => updateButtons(emblaCA, setCAButtonsDisabled));
      emblaCA.on("reInit", () => updateButtons(emblaCA, setCAButtonsDisabled));
    }
  }, [emblaCA, updateButtons]);

  useEffect(() => {
    if (emblaBTech) {
      updateButtons(emblaBTech, setBTechButtonsDisabled);
      emblaBTech.on("select", () => updateButtons(emblaBTech, setBTechButtonsDisabled));
      emblaBTech.on("reInit", () => updateButtons(emblaBTech, setBTechButtonsDisabled));
    }
  }, [emblaBTech, updateButtons]);

  useEffect(() => {
    if (emblaCSBS) {
      updateButtons(emblaCSBS, setCSBSButtonsDisabled);
      emblaCSBS.on("select", () => updateButtons(emblaCSBS, setCSBSButtonsDisabled));
      emblaCSBS.on("reInit", () => updateButtons(emblaCSBS, setCSBSButtonsDisabled));
    }
  }, [emblaCSBS, updateButtons]);

  const departments = [
    { id: 1, name: "Computer Application", images: ["/nba.png", "/a.jpg", "/nba.png"] },
    { id: 2, name: "B.Tech", images: ["/nba.png", "/nba.png", "/nba.png"] },
    { id: 3, name: "CSBS", images: ["/nba.png", "/nba.png", "/nba.png"] },
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
            index === 0 ? emblaCA : index === 1 ? emblaBTech : index === 2 ? emblaCSBS : null;
          const buttonsDisabled =
            index === 0
              ? caButtonsDisabled
              : index === 1
              ? bTechButtonsDisabled
              : csbsButtonsDisabled;

          return (
            <Card key={dept.id} className="h-full bg-white dark:bg-gray-800 shadow-md">
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
                    onClick={() => emblaInstance && emblaInstance.scrollPrev()}
                    disabled={buttonsDisabled.prev}
                    className={`absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full shadow-md 
                      ${
                        buttonsDisabled.prev
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                  >
                    &larr;
                  </button>
                  <button
                    onClick={() => emblaInstance && emblaInstance.scrollNext()}
                    disabled={buttonsDisabled.next}
                    className={`absolute top-1/2 right-2 transform -translate-y-1/2 p-2 rounded-full shadow-md 
                      ${
                        buttonsDisabled.next
                          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
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
