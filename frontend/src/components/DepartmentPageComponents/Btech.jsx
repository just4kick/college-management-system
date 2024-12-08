"use client";

import React from "react";

export default function Btech() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-300 mb-8">
        B.Tech Department
      </h1>

      <div className="w-full mb-6">
        <img
          src="/b.jpg" 
          alt="B.Tech Department"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        
        <div className="lg:w-1/3 flex justify-center items-center ">
          <img
            src="/mgd.jpg"
            alt="HOD"
            className="w-58 h-58 rounded-lg shadow-lg justify-center"
          />
        </div>
    
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
            HOD Message
          </h2>
          <p className="text-justify text-gray-700 dark:text-gray-300">
            Welcome to the Computer Science Department. We are committed to
            providing quality education and an environment for innovation. Our
            faculty and staff work tirelessly to support the growth and
            development of our students. Join us to explore the ever-expanding
            world of technology and contribute to shaping a better future.
          </p>
        </div>
      </div>

   
      <div className="bg-white dark:bg-gray-800 border rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-300">
          Courses Offered
        </h3>
        <table className="table-auto w-full text-gray-700 dark:text-gray-300 text-center">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">CSE</td>
              <td className="px-4 py-2 border">cse-101</td>
              <td className="px-4 py-2 border">
                <a
                  href="https://example.com/bca-syllabus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Download Syllabus
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">ECE</td>
              <td className="px-4 py-2 border">ece-101</td>
              <td className="px-4 py-2 border">
                <a
                  href="https://example.com/mca-syllabus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Download Syllabus
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">IT</td>
              <td className="px-4 py-2 border">it-101</td>
              <td className="px-4 py-2 border">
                <a
                  href="https://example.com/mca-syllabus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Download Syllabus
                </a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">CIVIL</td>
              <td className="px-4 py-2 border">civil-101</td>
              <td className="px-4 py-2 border">
                <a
                  href="https://example.com/mca-syllabus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Download Syllabus
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
