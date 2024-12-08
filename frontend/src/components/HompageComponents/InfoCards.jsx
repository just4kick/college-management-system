"use client";

import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InfoCards() {

  const people = [
    {
      id: 1,
      designation: "Principal",
      logo: "/mgd.jpg", 
      image: "/mgd.jpg", 
      name: "Dr. A. K. Sharma",
      message:
        "Welcome to our institution! We strive to provide a holistic education for the leaders of tomorrowWelcome to our institution! We strive to provide a holistic education for the leaders of tomorrowWelcome to our institution! We strive to provide a holistic education for the leaders of tomorrow.",
    },
    {
      id: 2,
      designation: "Director",
      logo: "/dir.png", 
      image: "/dir.png",
      name: "Prof. R. Singh",
      message:
        "Our mission is to foster an environment of academic excellence and innovationOur mission is to foster an environment of academic excellence and innovationOur mission is to foster an environment of academic excellence and innovationOur mission is to foster an environment of academic excellence and innovation.",
    },
    {
      id: 3,
      designation: "Vice-Principal",
      logo: "/mgd.jpg", 
      image: "/mgd.jpg", 
      name: "Ms. P. Roy",
      message:
        "Education is the key to unlocking potential. I am here to guide you on this incredible journey.Education is the key to unlocking potential. I am here to guide you on this incredible journey.Education is the key to unlocking potential. I am here to guide you on this incredible journey.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {people.map((person) => (
          <HoverCard key={person.id}>
  
            <HoverCardTrigger asChild>
              <Card className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg">
                <img
                  src={person.logo}
                  alt={`${person.designation} Logo`}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <p className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                  {person.designation}
                </p>
              </Card>
            </HoverCardTrigger>

            <HoverCardContent
              className="w-80 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg"
            >
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex items-center">
                  <img
                    src={person.image}
                    alt={`${person.name} Portrait`}
                    className="w-auto h-auto object-cover rounded-md"
                  />
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {person.name}
                    </CardTitle>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {person.designation}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {person.message}
                  </p>
                </CardContent>
              </Card>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}

export default InfoCards;
