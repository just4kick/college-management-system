import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming a styled Button component
import { Spinner } from "@/components/ui/spinner"; // Assuming a Spinner component for loading

export default function GenerateRegistrationKey() {
  const [facultyKeys, setFacultyKeys] = useState([{ key: "", isActive: true }]);
  const [studentKeys, setStudentKeys] = useState([{ key: "", isActive: true }]);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message

  const handleAddKey = (type) => {
    if (type === "faculty") {
      setFacultyKeys([...facultyKeys, { key: "", isActive: true }]);
    } else {
      setStudentKeys([...studentKeys, { key: "", isActive: true }]);
    }
  };

  const handleRemoveKey = (type, index) => {
    if (type === "faculty") {
      const updatedKeys = facultyKeys.filter((_, i) => i !== index);
      setFacultyKeys(updatedKeys);
    } else {
      const updatedKeys = studentKeys.filter((_, i) => i !== index);
      setStudentKeys(updatedKeys);
    }
  };

  const handleKeyChange = (type, index, value) => {
    if (type === "faculty") {
      const updatedKeys = facultyKeys.map((keyObj, i) =>
        i === index ? { ...keyObj, key: value } : keyObj
      );
      setFacultyKeys(updatedKeys);
    } else {
      const updatedKeys = studentKeys.map((keyObj, i) =>
        i === index ? { ...keyObj, key: value } : keyObj
      );
      setStudentKeys(updatedKeys);
    }
  };

  const handleSubmit = () => {
    if (facultyKeys.some((keyObj) => !keyObj.key) || studentKeys.some((keyObj) => !keyObj.key)) {
      setError("All keys must be filled in.");
      setSuccess(""); // Clear success message before submitting
      return;
    }

    setError(""); // Clear error before submitting
    setIsLoading(true); // Start loading
    setSuccess(""); // Clear any previous success message

    const payload = {
      facultyKeys,
      studentKeys,
    };

    console.log("Payload to submit: ", payload);

    // Simulate submitting the data
    setTimeout(() => {
      setIsLoading(false); // Stop loading
      setSuccess("Registration keys submitted successfully!"); // Set success message
    }, 2000); // Simulate a delay of 2 seconds (replace with actual API call)
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Generate Registration Keys
        </h1>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Success Message */}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

        {/* Faculty Keys */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Faculty Keys
          </h2>
          {facultyKeys.map((keyObj, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={keyObj.key}
                onChange={(e) => handleKeyChange("faculty", index, e.target.value)}
                placeholder="Enter faculty key"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <Button
                onClick={() => handleRemoveKey("faculty", index)}
                className="ml-2"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleAddKey("faculty")}
            className="mt-2"
            disabled={isLoading} // Disable while loading
          >
            Add Faculty Key
          </Button>
        </div>

        {/* Student Keys */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Student Keys
          </h2>
          {studentKeys.map((keyObj, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={keyObj.key}
                onChange={(e) => handleKeyChange("student", index, e.target.value)}
                placeholder="Enter student key"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <Button
                onClick={() => handleRemoveKey("student", index)}
                className="ml-2"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            onClick={() => handleAddKey("student")}
            className="mt-2"
            disabled={isLoading} // Disable while loading
          >
            Add Student Key
          </Button>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="mt-4 w-full"
          disabled={isLoading} // Disable while loading
        >
          {isLoading ? <Spinner /> : "Submit Keys"}
        </Button>
      </div>
    </div>
  );
}
