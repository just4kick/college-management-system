import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"; // Import Spinner if available

export default function DeleteFaculty() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for spinner

  // Handle input changes
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission to delete faculty by email
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is empty
    if (!email.trim()) {
      setError("Email is required.");
      setSuccess("");
      return;
    }

    setLoading(true); // Start loading spinner
    setError("");
    let localRole = localStorage.getItem('user')
  localRole = JSON.parse(localRole)
  const role = localRole.role
    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/delete-faculty`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      })
      console.log(response)
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      
      console.log("Attempting to delete faculty with email:", email);

      // Simulate success
      setEmail("");
      setError("");
      setSuccess("Faculty member deleted successfully.");
    } catch (err) {
      console.error("Error deleting faculty:", err);
      setError("An error occurred while deleting the faculty member.");
      setSuccess("");
    } finally {
      setLoading(false); // Stop loading spinner
    }
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
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Delete Faculty"}
          </Button>
        </form>
      </div>
    </div>
  );
}
