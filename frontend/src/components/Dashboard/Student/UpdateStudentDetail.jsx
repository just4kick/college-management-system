import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"; // Import Spinner if you have it

export default function UpdateStudentDetail() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    rollNumber: "",
    department: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the spinner

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result); // Display image preview
        setFormData((prev) => ({ ...prev, avatar: reader.result })); // Save as base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, rollNumber, department, avatar } = formData;

    if (!fullName || !email || !phoneNumber || !rollNumber || !department) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    setLoading(true); // Start spinner
    setError("");

    try {
      // Simulate submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay
      console.log("Student Data Updated:", formData);

      setSuccess("Student details updated successfully.");
      setAvatarPreview(null);
    } catch (err) {
      console.error("Error updating student details:", err);
      setError("An error occurred while updating the details.");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Update Student Details
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="w-full">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="w-full">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <Input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Roll Number */}
          <div className="w-full">
            <label
              htmlFor="rollNumber"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Roll Number
            </label>
            <Input
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="Enter roll number"
              required
            />
          </div>

          {/* Department */}
          <div className="w-full">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Department
            </label>
            <Input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter department name"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div className="w-full">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Update Avatar
            </label>
            <Input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
            {avatarPreview && (
              <div className="mt-4">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full border mt-2"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Update Details"}
          </Button>
        </form>
      </div>
    </div>
  );
}
