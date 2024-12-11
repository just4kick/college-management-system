import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component for loading

// Mock Data: You can replace this with actual data from your API in the future
const students = [
  { email: "john.doe@example.com", fullName: "John Doe", course: "Computer Science", year: "2nd Year", avatar: "https://via.placeholder.com/50" },
  { email: "jane.doe@example.com", fullName: "Jane Doe", course: "Business Administration", year: "3rd Year", avatar: "https://via.placeholder.com/50" },
  { email: "bob.smith@example.com", fullName: "Bob Smith", course: "Mechanical Engineering", year: "1st Year", avatar: "https://via.placeholder.com/50" },
];

export default function SearchStudent() {
  const [email, setEmail] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle search for student by email
  const handleSearch = (e) => {
    e.preventDefault();
    
    setIsLoading(true); // Start loading spinner

    // Simulate delay to mimic real API search
    setTimeout(() => {
      // Check if student exists in mock data
      const foundStudent = students.find(
        (student) => student.email.toLowerCase() === email.toLowerCase()
      );

      if (!foundStudent) {
        setError("No student found with this email.");
        setStudent(null);
      } else {
        setStudent(foundStudent);
        setError("");
      }

      setIsLoading(false); // Stop loading spinner
    }, 1500); // Simulate a 1.5 seconds delay
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Search Student
        </h1>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Email Input Field */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter student's email"
              required
            />
          </div>

          {/* Search Button */}
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Search Student"}
          </Button>
        </form>

        {/* Display Search Result */}
        {student && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Student Details:
            </h2>

            {/* Displaying Student Information in Table-like Row */}
            <div className="overflow-x-auto mt-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Full Name</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Course</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Year</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Email</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Avatar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2">{student.fullName}</td>
                    <td className="px-4 py-2">{student.course}</td>
                    <td className="px-4 py-2">{student.year}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">
                      <img
                        src={student.avatar}
                        alt={`${student.fullName}'s avatar`}
                        className="w-12 h-12 rounded-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
