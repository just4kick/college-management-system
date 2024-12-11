import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner"; 

export default function CreateAdmin() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "admin",
    avatar: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.avatar
    ) {
      setError("All fields are required!");
      setIsLoading(false); // Stop loading
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      console.log("Submitted data:", formData);
      setSuccessMessage("Admin created successfully!");
      setError("");
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "admin",
        avatar: null,
      });
      setIsLoading(false); // Stop loading after success
    }, 2000); // Simulate API delay
  };

  return (
    <div className="h-screen flex justify-center items-start bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Create Admin
        </h1>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
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
          <div>
            <Label htmlFor="email">Email</Label>
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
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
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
          <div>
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              "Create Admin"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
