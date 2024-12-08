"use client";

import React from "react";

export default function ManageDirector() {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          Managing Director's Desk
        </h1>
      <div className="w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-6">

        <div className="flex justify-center">
          <div className="w-40 h-40">
            <img
              src="/mgd.jpg" 
              alt="Managing Director"
              className="w-full h-full object-cover rounded-full border"
            />
          </div>
        </div>


        <div className="text-center mt-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            From Co-Founder and Managing Director’s Desk
          </h2>
        </div>


        <div className="flex justify-center mt-6">
          <div className="w-3/4 lg:w-2/4 text-gray-700 dark:text-gray-300">
            <p className="text-justify">
              “Somewhere, something incredible is waiting to be known.” These words by astrophysicist and author Carl Sagan have always urged me to wonder there is so much to learn every single day. Knowledge is so plentiful that one lifetime is not enough to know everything, and thus, I advise my students to learn beyond their syllabus. I believe every student has immense potential to excel. In all our colleges, we provide holistic education and ample avenues to connect with the outer world. Meghnad Saha Institute of Technology is designed to be the second home for the students pursuing their dreams here.
            </p>
          </div>
        </div>


        <div className="flex justify-center mt-6">
          <div className="w-3/4 lg:w-2/4 text-left">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Mr. Satyam Roy Chowdhury
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Co-Founder and Managing Director<br />
              Techno India Group
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
