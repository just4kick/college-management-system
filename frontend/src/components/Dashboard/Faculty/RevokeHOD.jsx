import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // Assuming you have a styled Input component
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component
import { Label } from "@/components/ui/label"; // Assuming you have a Label component

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

    // Simulate an API request with a timeout (replace with actual API call)
    // try {
    //   const response = await fetch("/api/revoke-hod", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, deptId }),
    //   });

    //   if (response.ok) {
    //     setSuccessMessage("HOD revoked successfully.");
    //     setFormData({ email: "", deptId: "" }); // Reset form data after success
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Failed to revoke HOD.");
    //   }
    // } catch (error) {
    //   setError("Error occurred while revoking HOD.");
    // } finally {
    //   setIsLoading(false); // Stop loading
    // }
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setSuccessMessage("HOD assigned successfully!"); // Show success message
      setFormData({ email: "", deptId: "" }); // Reset form data
    }, 2000); // Simulate a 2-second request delay
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
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
            <Label htmlFor="deptId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              "Revoke HOD"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
