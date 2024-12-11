import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component

export default function SearchFaculty() {
  const [email, setEmail] = useState("");
  const [facultyData, setFacultyData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for spinner

  // Handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Simulate fetching faculty data by email with a delay
  const fetchFacultyByEmail = (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Replace this with your actual API call.
        const mockData = {
          email: "faculty@example.com",
          fullName: "John Doe",
          phoneNumber: "123-456-7890",
          avatar: "/path/to/avatar.jpg",
          department: "Computer Science",
          role: "faculty",
        };

        if (email === mockData.email) {
          resolve(mockData);
        } else {
          resolve(null); // Simulate no faculty found
        }
      }, 2000); // Simulate a 2-second delay
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      setFacultyData(null);
      return;
    }

    setError("");
    setLoading(true); // Start loading spinner

    try {
      const result = await fetchFacultyByEmail(email);

      if (result) {
        setFacultyData(result);
        setError("");
      } else {
        setFacultyData(null);
        setError("Faculty member not found.");
      }
    } catch (err) {
      console.error("Error fetching faculty:", err);
      setError("An error occurred while searching for the faculty member.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Search Faculty by Email
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter faculty email"
              required
              className="bg-gray-50 dark:bg-gray-700 dark:text-gray-100"
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

        {/* Display Search Result */}
        {facultyData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Faculty Details
            </h2>

            {/* Faculty Details Row */}
            <div className="overflow-x-auto mt-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Full Name</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Email</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Phone</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Department</th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Avatar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-2">{facultyData.fullName}</td>
                    <td className="px-4 py-2">{facultyData.email}</td>
                    <td className="px-4 py-2">{facultyData.phoneNumber}</td>
                    <td className="px-4 py-2">{facultyData.department}</td>
                    <td className="px-4 py-2">
                      <img
                        src={facultyData.avatar}
                        alt="Faculty Avatar"
                        className="w-16 h-16 rounded-full"
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
