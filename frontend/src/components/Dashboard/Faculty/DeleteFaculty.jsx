import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DeleteFaculty() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission to delete faculty by email
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the email is empty
    if (!email) {
      setError("Email is required.");
      setSuccess("");
      return;
    }

    // Simulate deleting the faculty member (replace with actual API call)
    // For now, we are assuming that a faculty member exists with this email
    // You can replace this part with a real API call for deletion

    console.log("Attempting to delete faculty with email:", email);
    // Reset email field
    setEmail("");
    setError("");
    setSuccess("Faculty member deleted successfully.");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Delete Faculty by Email
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Faculty Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter faculty email to delete"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Delete Faculty
          </Button>
        </form>
      </div>
    </div>
  );
}
