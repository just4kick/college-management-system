import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    deptId: "",
    course: "",
    year: "",
    session: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setFormData((prev) => ({ ...prev, avatar: file })); // Save file
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phoneNumber, password, deptId, course, year, session } = formData;

    // Validate inputs
    if (!fullName || !email || !phoneNumber || !password || !deptId || !course || !year || !session) {
      setError("All fields are required.");
      setSuccessMessage("");
      return;
    }

    setError(""); // Reset error
    setIsLoading(true); // Start loading spinner

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/register-student', {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setIsLoading(false); // Stop loading
      setSuccessMessage("Student registered successfully!"); // Show success message
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        deptId: "",
        course: "",
        year: "",
        session: "",
        avatar: null,
      });
      setAvatarPreview(null);
    } catch (err) {
      console.error("Error registering student:", err);
      setError("An error occurred while registering the student.");
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Register Student
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
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

          {/* Email Field */}
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

          {/* Phone Number Field */}
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

          {/* Password Field */}
          <div className="w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
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

          {/* Course Field */}
          <div className="w-full">
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Course
            </label>
            <Input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Enter course"
              required
            />
          </div>

          {/* Year Field */}
          <div className="w-full">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Year
            </label>
            <Input
              type="text"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter year"
              required
            />
          </div>

          {/* Session Field */}
          <div className="w-full">
            <label
              htmlFor="session"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Session
            </label>
            <Input
              type="text"
              id="session"
              name="session"
              value={formData.session}
              onChange={handleChange}
              placeholder="Enter session"
              required
            />
          </div>

          {/* Avatar Upload Field */}
          <div className="w-full">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Avatar (Optional)
            </label>
            <Input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-2 w-32 h-32 rounded-md"
              />
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Register Student"}
          </Button>
        </form>
      </div>
    </div>
  );
}