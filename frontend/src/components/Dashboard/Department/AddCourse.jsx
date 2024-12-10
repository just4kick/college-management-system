import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddCourses() {
  const [formData, setFormData] = useState({
    deptId: "",
    courses: [""],
  });
  const [error, setError] = useState("");

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle courses change (dynamic fields)
  const handleCourseChange = (index, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = value;
    setFormData((prev) => ({ ...prev, courses: updatedCourses }));
  };

  // Add a new course input field
  const addCourseField = () => {
    setFormData((prev) => ({ ...prev, courses: [...prev.courses, ""] }));
  };

  // Remove a course input field
  const removeCourseField = (index) => {
    const updatedCourses = formData.courses.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, courses: updatedCourses }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { deptId, courses } = formData;

    if (!deptId || courses.some((course) => course.trim() === "")) {
      setError("All fields are required, and courses cannot be empty.");
      return;
    }

    // Reset error and log formData (replace with actual API call)
    setError("");
    console.log("Courses Data Submitted:", formData);
    alert("Courses successfully added.");
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add Courses to Department
        </h1>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
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
              value={formData.deptId}
              onChange={handleChange}
              placeholder="Enter department ID"
              required
            />
          </div>

          {/* Courses */}
          <div className="w-full">
            <label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Courses
            </label>
            {formData.courses.map((course, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  type="text"
                  value={course}
                  onChange={(e) => handleCourseChange(index, e.target.value)}
                  placeholder={`Enter course #${index + 1}`}
                  className="flex-1"
                  required
                />
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removeCourseField(index)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={addCourseField} className="mt-2">
              Add Course
            </Button>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Add Courses
          </Button>
        </form>
      </div>
    </div>
  );
}
