import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DeleteDepartment() {
  const [deptId, setDeptId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setDeptId(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!deptId.trim()) {
      setError("Department ID is required.");
      setSuccess("");
      return;
    }

    // Simulate deletion request (replace with actual API call)
    console.log(`Department with ID: ${deptId} deleted.`);
    setError("");
    setSuccess(`Department with ID: ${deptId} successfully deleted.`);

    // Clear the input field
    setDeptId("");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Delete Department
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Department ID */}
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
              value={deptId}
              onChange={handleChange}
              placeholder="Enter department ID to delete"
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Delete Department
          </Button>
        </form>
      </div>
    </div>
  );
}
