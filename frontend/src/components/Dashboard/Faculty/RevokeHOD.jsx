import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

export default function RevokeHOD() {
  const [formData, setFormData] = useState({
    email: "",
    deptId: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

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
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/revoke-hod', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ HODemail: email, deptId }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setSuccessMessage("HOD revoked successfully!");
      setFormData({ email: "", deptId: "" }); // Reset form data
    } catch (err) {
      console.error("Error revoking HOD:", err);
      setError("An error occurred while revoking the HOD.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Revoke HOD from Department
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="w-full">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Faculty Email
            </Label>
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
            <Label
              htmlFor="deptId"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Department ID
            </Label>
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
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Revoke HOD"}
          </Button>
        </form>
      </div>
    </div>
  );
}