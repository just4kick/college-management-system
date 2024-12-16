import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function AddCourse() {
  const [formData, setFormData] = useState({ deptId: "", courses: [""] });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Add a new course input field
  const addCourseField = () => {
    setFormData((prev) => ({ ...prev, courses: [...prev.courses, ""] }));
  };

  // Remove a course input field
  const removeCourseField = (index) => {
    const updatedCourses = formData.courses.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, courses: updatedCourses }));
  };

  // Handle input change for department ID
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle input change for courses
  const handleCourseChange = (index, value) => {
    const updatedCourses = [...formData.courses];
    updatedCourses[index] = value;
    setFormData({ ...formData, courses: updatedCourses });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { deptId, courses } = formData;

    // Clear previous success message
    setSuccess("");

    if (!deptId || courses.some((course) => course.trim() === "")) {
      setError("All fields are required, and courses cannot be empty.");
      return;
    }

    setError("");
    setLoading(true); // Set loading to true

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/update-course', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ deptId, courses }),
      });

      const result = await response.json();
      console.log(result)
      if (!response.ok) throw new Error(result.message);

      // Show success message
      setSuccess("Courses successfully added.");
      setFormData({
        deptId: "",
        courses: [""],
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Add Courses to Department
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
          <Button
            type="submit"
            className="w-full mt-6 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner className="w-5 h-5 animate-spin" /> : "Add Courses"}
          </Button>
        </form>
      </div>
    </div>
  );
}