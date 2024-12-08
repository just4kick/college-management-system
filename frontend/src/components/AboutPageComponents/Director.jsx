"use client";

import React from "react";

export default function Director() {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold text-primary mb-4 text-center">
          Director
        </h1>
      <div className="w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-6">
       
        <div className="flex justify-center">
          <div className="w-52 h-52">
            <img
              src="/dir.png" 
              alt="Director"
              className="w-full h-full object-cover rounded-full border"
            />
          </div>
        </div>

     
        <div className="text-center mt-4">
        
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Prof. (Dr.) Sukumar Ray Chaudhuri
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Director, MSIT
          </p>
          <p className="text-md font-medium text-gray-600 dark:text-gray-400 mt-2">
            Director's Desk
          </p>
        </div>

 
        <div className="flex justify-center mt-6">
          <div className="w-4/5 lg:w-3/5 text-gray-700 dark:text-gray-300">
            <p className="text-justify mb-4">
              I welcome all the students, their parents, and stakeholders of Meghnad Saha Institute of Technology, on behalf of the management, faculty, and staff members of this college, bearing the legacy of the great academic conglomerate, Techno India Group.
            </p>
            <p className="text-justify mb-4">
              The institute evolved since 2001 with the blessings of visionary academic entrepreneurs Mr. Satyam Roychowdhury and Late Mou Roychowdhury. Now students get opportunities to build their career in Computer Science, Information Technology, Artificial Intelligence, Data Science, Machine Language, Cyber Security, Internet of Things, Computer Applications, Electronics and Communication, Electrical, Civil, and Mechanical Engineering as well as Business Administration at the under-graduate and post-graduate levels.
            </p>
            <p className="text-justify mb-4">
              The institute is proud of its glittering placement record in all branches of engineering and management taught here. Apart from market-driven computer-linked subjects with pan-global demand, we can assure 100% placement in core branches of Electrical, Civil, and Mechanical, much ahead of any perceived competitor.
            </p>
            <p className="text-justify mb-4">
              The confidence of national and multinational recruiters on MSIT (Meghnad Saha Institute of Technology) brand is the fruit of systematic and well-planned strategies and hard work of experienced, dedicated faculty and staff members of this institute. Our academic excellence has been assessed by the National Bureau of Accreditation leading to NBA certification of major branches in this college.
            </p>
            <p className="text-justify mb-4">
              Only curriculum-centric teaching could not make us earn confidence of employers. We design and implement domain knowledge training modules to bridge the gap between curriculum and demand of the industry. Our students are made industry-ready by such training, delivered to them free of cost during vacations. Further, vernacular students are supported to improve their communication skills, body language, and interview preparedness through special training by experts.
            </p>
            <p className="text-justify mb-4">
              We have excellent infrastructure e.g. wi-fi, library, modern labs, canteen, etc.
            </p>
            <p className="text-justify mb-4">
              Students enjoy campus life here by their participation in different student-managed clubs, as per their hobby. The institute supports students to enroll in music club, cultural activity club, social service club, debate club, sports & games club, photography club, innovation club, and many others.
            </p>
            <p className="text-justify mb-4">
              We invite all prospective students to visit our campus, talk to our counselors and discover many other gems of this institute, and fulfill the dreams of their parents by transforming themselves with the handholding support of our experienced teachers as students in courses that attract them to a golden future.
            </p>
            <p className="text-justify">
              Wish you all a very bright future
            </p>
          </div>
        </div>

       
        <div className="flex justify-center mt-6">
          <div className="w-4/5 lg:w-3/5 text-left">
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              Prof. (Dr.) Sukumar Ray Chaudhuri
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Director<br />
              Meghnad Saha Institute of Technology
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
