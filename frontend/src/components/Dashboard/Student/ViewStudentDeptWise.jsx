import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ViewStudentDeptWise() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Extract role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("user");
    if (storedRole) {
      const parsedRole = JSON.parse(storedRole);
      setRole(parsedRole.role);
    }
  }, []);

  // Fetch students department-wise
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/v1/${role}/view-student-deptWise`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        setData(result.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching the data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (role) {
      fetchData();
    }
  }, [role]);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentDepartments = data.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>VIEW STUDENTS DEPARTMENT-WISE</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            currentDepartments.map((dept) => (
              <div key={dept._id} className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {dept.departmentName.toUpperCase()}
                </h2>
                {dept.students.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>NAME</TableHead>
                        <TableHead>COURSE</TableHead>
                        <TableHead>YEAR</TableHead>
                        <TableHead>SESSION</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dept.students.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>{student}</TableCell>
                          <TableCell>{dept.courses[index]}</TableCell>
                          <TableCell>{dept.year[index]}</TableCell>
                          <TableCell>{dept.session[index]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    No students found in this department.
                  </p>
                )}
              </div>
            ))
          )}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              Previous
            </Button>
            <span className="text-gray-700 dark:text-gray-300">
              Page {currentPage}
            </span>
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(data.length / studentsPerPage)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}