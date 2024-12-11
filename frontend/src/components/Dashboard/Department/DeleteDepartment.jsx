import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function DeleteDepartment() {
  const [deptId, setDeptId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setDeptId(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!deptId.trim()) {
      setError("Department ID is required.");
      setSuccess("");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Simulate deletion request (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(`Department with ID: ${deptId} deleted.`);
      setSuccess(`Department with ID: ${deptId} successfully deleted.`);
      setDeptId(""); // Clear the input field
    } catch (err) {
      console.error("Error deleting department:", err);
      setError("An error occurred while deleting the department.");
    } finally {
      setLoading(false);
    }
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
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Delete Department"}
          </Button>
        </form>
      </div>
    </div>
  );
}
