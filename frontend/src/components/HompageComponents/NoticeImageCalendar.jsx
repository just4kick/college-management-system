"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
export function NoticeImageCalendar() {
  const [date, setDate] = useState(new Date());
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/global-notice", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        console.log(result.data)
        const globalNotices = result.data.filter(notice=>notice.isGlobal)
        console.log(globalNotices)
        setNotices(globalNotices);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setMessage("An error occurred while fetching the notices.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">

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


        <div className="w-full md:w-1/3">
          <Card className="h-full w-full bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-center text-gray-900 dark:text-gray-100">
                Notice Board
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-72 pt-4">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spinner className="w-10 h-10 animate-spin" />
              </div>
            ) : (
              <ul className="space-y-2">
                {notices.map((notice) => (
                  <li
                    key={notice._id}
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <a href={notice.content} target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 hover:text-blue-500">
                      {notice.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {message && <p className="mt-4 text-red-500 dark:text-red-400">{message}</p>}
          </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
