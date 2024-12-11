import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component for loading

// Mock Data: You can replace this with actual data from your API in the future
const students = [
  { email: "john.doe@example.com", fullName: "John Doe", course: "Computer Science", year: "2nd Year" },
  { email: "jane.doe@example.com", fullName: "Jane Doe", course: "Business Administration", year: "3rd Year" },
  { email: "bob.smith@example.com", fullName: "Bob Smith", course: "Mechanical Engineering", year: "1st Year" },
];

export default function DeleteStudent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [studentsData, setStudentsData] = useState(students); // Store the students
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle input change for email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission for deleting a student
  const handleDelete = (e) => {
    e.preventDefault();

    // Check if the email exists in the students data
    const studentExists = studentsData.some((student) => student.email === email);

    if (!studentExists) {
      setError("No student found with the provided email.");
      setSuccessMessage("");
      return;
    }

    setIsLoading(true); // Start loading spinner

    // Simulate deleting the student
    setTimeout(() => {
      const updatedStudents = studentsData.filter((student) => student.email !== email);
      setStudentsData(updatedStudents);
      setEmail("");
      setError("");
      setSuccessMessage("Student deleted successfully.");
      setIsLoading(false); // Stop loading spinner
    }, 2000); // Simulate 2 seconds delay
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Delete Student
        </h1>

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Success message */}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form */}
        <form onSubmit={handleDelete} className="space-y-6">
          {/* Email Field */}
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

          {/* Submit Button */}
          
            <Button type="submit" className="w-full mt-2" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Delete Student"}
            </Button>
          
        </form>

        {/* Success message after deletion */}
        {successMessage && (
          <div className="mt-4 text-green-500 text-sm">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
