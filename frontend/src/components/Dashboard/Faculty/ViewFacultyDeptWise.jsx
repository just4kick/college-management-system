import React, { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ViewFacultyDeptWise() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let localRole = localStorage.getItem('user')
  localRole = JSON.parse(localRole)
  const role = localRole.role
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/v1/${role}/view-faculty-deptWise`, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        setDepartments(result.data);
        setError("");
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("An error occurred while fetching the departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          View Faculty by Department
        </h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner className="w-10 h-10 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        ) : (
          <div className="space-y-6">
            {departments.map((department) => (
              <Card key={department._id}>
                <CardHeader>
                  <CardTitle>
                  {department.departmentName.toUpperCase()} ({department.deptId.toLowerCase()})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {department.faculties.length > 0 ? (
                    <div className="overflow-x-auto mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md" style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Faculty Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Is HOD</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {department.faculties.map((faculty, index) => (
                            <TableRow key={index}>
                              <TableCell>{faculty}</TableCell>
                              <TableCell>{department.email[index]}</TableCell>
                              <TableCell>{department.isHod[index] ? "Yes" : "No"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No faculties available</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}