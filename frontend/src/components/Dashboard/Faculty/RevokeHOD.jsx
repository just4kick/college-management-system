import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component

export default function RevokeHOD() {
  const [formData, setFormData] = useState({
    email: "",
    deptId: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, deptId } = formData;

    // Validate inputs
    if (!email || !deptId) {
      setError("Both Email and Department ID are required.");
      return;
    }

    setError(""); // Reset error message

    // Replace with your API call for revoking HOD
    try {
      // Simulate API call for revoking HOD
      const response = await fetch("/api/revoke-hod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, deptId }),
      });

      if (response.ok) {
        setSuccessMessage("HOD revoked successfully.");
        setFormData({ email: "", deptId: "" }); // Reset form data after success
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to revoke HOD.");
      }
    } catch (error) {
      setError("Error occurred while revoking HOD.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Revoke HOD from Department
        </h1>
        
        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Success message */}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}

        {/* Form */}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter faculty email"
              required
            />
          </div>

          {/* Department ID Field */}
          <div className="w-full">
            <label
              htmlFor="deptId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Department ID
            </label>
            <Input
              type="text"
              id="deptId"
              name="deptId"
              value={formData.deptId}
              onChange={handleChange}
              placeholder="Enter department ID"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Revoke HOD
          </Button>
        </form>
      </div>
    </div>
  );
}
