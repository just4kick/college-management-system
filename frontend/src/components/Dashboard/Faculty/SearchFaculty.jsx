import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SearchFaculty() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [faculty, setFaculty] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Faculty email is required.");
      setSuccess("");
      setFaculty(null);
      return;
    }

    setError("");
    setLoading(true);
    let localRole = localStorage.getItem('user')
  localRole = JSON.parse(localRole)
  const role = localRole.role
    try {
      const response = await fetch(`http://localhost:8000/api/v1/${role}/search-faculty?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        credentials: 'include',
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setFaculty(result.data);
      setSuccess("Faculty found successfully.");
    } catch (err) {
      console.error("Error fetching faculty:", err);
      setError("An error occurred while fetching the faculty.");
      setFaculty(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Search Faculty by Email
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
              placeholder="Enter faculty email to search"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Search Faculty"}
          </Button>
        </form>
        {faculty && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Faculty Details
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
              <p><strong>Name:</strong> {faculty.fullName}</p>
              <p><strong>Email:</strong> {faculty.email}</p>
              <p><strong>Phone Number:</strong> {faculty.phoneNumber}</p>
              <p><strong>Department:</strong> {faculty.department.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}