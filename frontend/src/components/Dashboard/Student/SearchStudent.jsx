import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component for loading

export default function SearchStudent() {
  const [email, setEmail] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [role, setRole] = useState("");

  // Extract role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.role);
    }
  }, []);

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle search for student by email
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setStudent(null);
      return;
    }

    setError(""); // Reset error message
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/search-student?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setIsLoading(false); // Stop loading
      setStudent(result.data); // Set student data
    } catch (err) {
      console.error("Error searching student:", err);
      setError("An error occurred while searching for the student.");
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Search Student
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSearch} className="space-y-6">
          {/* Email Field */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Student Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter student email"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Search Student"}
          </Button>
        </form>
        {student && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Student Details</h2>
            <p><strong>Full Name:</strong> {student.fullName}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Year:</strong> {student.year}</p>
            <p><strong>Department:</strong> {student.department.name}</p>
            {student.avatar && <img src={student.avatar} alt="Avatar" className="mt-2 w-32 h-32 rounded-md" />}
          </div>
        )}
      </div>
    </div>
  );
}