import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const GenerateKey = () => {
  const [deptId, setDeptId] = useState('');
  const [facultyKeys, setFacultyKeys] = useState([]);
  const [studentKeys, setStudentKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleAddFacultyKey = () => {
    setFacultyKeys([...facultyKeys, ""]);
  };

  const handleAddStudentKey = () => {
    setStudentKeys([...studentKeys, ""]);
  };

  const handleFacultyKeyChange = (index, value) => {
    const newKeys = [...facultyKeys];
    newKeys[index] = value.trim().toLowerCase();
    setFacultyKeys(newKeys);
  };

  const handleStudentKeyChange = (index, value) => {
    const newKeys = [...studentKeys];
    newKeys[index] = value.trim().toLowerCase();
    setStudentKeys(newKeys);
  };

  const handleRemoveFacultyKey = (index) => {
    const newKeys = facultyKeys.filter((_, i) => i !== index);
    setFacultyKeys(newKeys);
  };

  const handleRemoveStudentKey = (index) => {
    const newKeys = studentKeys.filter((_, i) => i !== index);
    setStudentKeys(newKeys);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear error before submitting
    setIsLoading(true); // Start loading
    setSuccess(""); // Clear any previous success message

    const payload = {
      deptId: deptId.trim().toLowerCase(),
      facultyKeys: facultyKeys.map(key => ({ key })),
      studentKeys: studentKeys.map(key => ({ key })),
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/generate-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setSuccess("Registration keys submitted successfully!");
      setDeptId('');
      setFacultyKeys([]);
      setStudentKeys([]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
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

        <form onSubmit={handleSubmit}>
          {/* Department ID */}
          <div className="mb-6">
            <Label htmlFor="deptId">Department ID</Label>
            <Input
              id="deptId"
              value={deptId}
              onChange={(e) => setDeptId(e.target.value.trim().toLowerCase())}
              required
            />
          </div>

          {/* Faculty Keys */}
          <div className="mb-6">
            <Label htmlFor="facultyKeys">Faculty Emails</Label>
            {facultyKeys.map((key, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  id={`facultyKey-${index}`}
                  value={key}
                  onChange={(e) => handleFacultyKeyChange(index, e.target.value)}
                  className="mr-2"
                  type="email"
                  required
                />
                <Button type="button" onClick={() => handleRemoveFacultyKey(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddFacultyKey} className="mt-2">
              Add Faculty Email
            </Button>
          </div>

          {/* Student Keys */}
          <div className="mb-6">
            <Label htmlFor="studentKeys">Student Emails</Label>
            {studentKeys.map((key, index) => (
              <div key={index} className="flex items-center mb-2">
                <Input
                  id={`studentKey-${index}`}
                  value={key}
                  onChange={(e) => handleStudentKeyChange(index, e.target.value)}
                  className="mr-2"
                  type="email"
                  required
                />
                <Button type="button" onClick={() => handleRemoveStudentKey(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddStudentKey} className="mt-2">
              Add Student Email
            </Button>
          </div>

          <Button type="submit" disabled={isLoading} className="mt-4">
            {isLoading ? <Spinner /> : 'Generate Keys'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GenerateKey;