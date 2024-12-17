import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component for loading

// Extract role from localStorage


export default function DeleteStudent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state


let localRole = localStorage.getItem('user');
localRole = JSON.parse(localRole);
const role = localRole.role;
  // Handle input change for email
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission for deleting a student
  const handleDelete = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setSuccessMessage("");
      return;
    }

    setError(""); // Reset error message
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/delete-student`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setIsLoading(false); // Stop loading
      setSuccessMessage("Student deleted successfully!"); // Show success message
      setEmail(""); // Reset email field
    } catch (err) {
      console.error("Error deleting student:", err);
      setError("An error occurred while deleting the student.");
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Delete Student
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
        <form onSubmit={handleDelete} className="space-y-6">
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
            {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Delete Student"}
          </Button>
        </form>
      </div>
    </div>
  );
}