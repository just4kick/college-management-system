"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NoticeImageCalendar() {
  const [date, setDate] = useState(new Date());

  const notices = [
    "Semester exams begin from Dec 20",
    "Annual sports meet on Jan 5",
    "Holiday notice for Dec 25",
    "Workshop on AI on Jan 10",
    "Guest lecture on Dec 18",
    "Blood donation camp on Jan 15",
    "Cultural fest registrations open",
    "Library renovation updates",
    "Free online courses available",
    "Tech fest volunteer meet",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section: Image and Paragraph */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <Card className="h-full w-full bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                NBA Accredited
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between h-auto">
              <img
                src="nba.png"
                alt="College Building"
                className="w-full h-auto object-cover rounded-lg"
              />
              <p className="mt-4 text-center text-gray-700 dark:text-gray-400">
                Welcome to our college! Here, we strive for excellence in
                education and beyond.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Center Section: Calendar */}
        <div className="flex justify-center w-full md:w-1/3">
          <Card className="h-full w-full bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full flex items-center justify-center h-auto">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Notice Board */}
        <div className="w-full md:w-1/3">
          <Card className="h-full w-full bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                Notice Board
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-72 pt-4">
              <ul className="space-y-2">
                {notices.map((notice, index) => (
                  <li
                    key={index}
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {notice}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
