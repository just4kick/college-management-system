import React, { useState } from "react";
import Webcam from "react-webcam";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    avatar: null,
    capturedImage: null,
    password: "",
    role: "faculty",
    department: "",
    course:"",
    year:"",
    session:"",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const webcamRef = React.useRef(null);

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

  // Handle image upload for capture section
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Display image preview
        setFormData((prev) => ({ ...prev, capturedImage: reader.result })); // Save as base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Capture webcam image
  const captureWebcamImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImagePreview(imageSrc); // Display webcam image preview
    setFormData((prev) => ({ ...prev, capturedImage: imageSrc })); // Save as base64
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, avatar, password, department, capturedImage } = formData;

    if (!fullName || !email || !phoneNumber || !password || !department || !avatar || !capturedImage) {
      setError("All fields are required. Please provide both avatar and captured image.");
      setSuccess("");
      return;
    }

    // Simulate submission (replace with actual API call)
    console.log("Faculty Data Submitted:", formData);
    setError("");
    setSuccess("Faculty registered successfully.");
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      avatar: null,
      capturedImage: null,
      password: "",
      role: "faculty",
      department: "",
      course:"",
      year:"",
      session:"",
    });
    setAvatarPreview(null);
    setImagePreview(null);
    setUseWebcam(false);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Register Student
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
          {/* course */}
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
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter course name"
              required
            />
          </div>

          {/* Year */}
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
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter Year"
              required
            />
          </div>

          {/* Session */}
          <div className="w-full">
            <label
              htmlFor="Session"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Session
            </label>
            <Input
              type="text"
              id="Session"
              name="Session"
              value={formData.department}
              onChange={handleChange}
              placeholder="Enter Session"
              required
            />
          </div>

          {/* Avatar Upload */}
          <div className="w-full">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Upload Avatar
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

          {/* Capture Image */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Capture or Upload Image
            </label>
            {useWebcam ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-md border"
                />
                <div className="flex space-x-2 mt-4">
                  <Button type="button" onClick={captureWebcamImage}>
                    Capture Image
                  </Button>
                  <Button type="button" onClick={() => setUseWebcam(false)}>
                    Cancel Webcam
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-2"
                />
                <Button type="button" onClick={() => setUseWebcam(true)}>
                  Use Webcam
                </Button>
              </>
            )}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Captured or Uploaded Image Preview"
                  className="w-24 h-24 rounded-full border mt-2"
                />
              </div>
            )}
          </div>

          {/* Password */}
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

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Register Student
          </Button>
        </form>
      </div>
    </div>
  );
}
