import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const CreateDepartment = () => {
  const [formData, setFormData] = useState({
    name: "",
    deptId: "",
    courses: [""],
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
  const [successMessage, setSuccessMessage] = useState(""); // Success message

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error before submitting
    setIsSubmitting(true); // Start loading
    setSuccessMessage(""); // Clear any previous success message

    const payload = {
      ...formData,
      deptId: formData.deptId.trim().toLowerCase(),
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/create-dept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccessMessage("Department created successfully!");
      setFormData({
        name: "",
        deptId: "",
        courses: [""],
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  return (
    <Card className="w-[600px] max-w-full mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create Department</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="deptId">Department ID</Label>
            <Input
              id="deptId"
              name="deptId"
              value={formData.deptId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Courses</Label>
            {formData.courses.map((course, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  value={course}
                  onChange={(e) => handleCourseChange(index, e.target.value)}
                  required
                />
                <Button type="button" onClick={() => removeCourseField(index)} className="ml-2">
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={addCourseField}>
              Add Course
            </Button>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : 'Create Department'}
          </Button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
      </CardContent>
    </Card>
  );
};

export default CreateDepartment;