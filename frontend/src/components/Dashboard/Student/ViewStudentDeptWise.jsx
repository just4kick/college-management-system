import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a styled Button component

export default function ViewStudentDeptWise() {
  const [departments, setDepartments] = useState([]);
  const [departmentPages, setDepartmentPages] = useState({});
  const studentsPerPage = 10; // Set number of students per page for pagination

  // Mock API Response with additional fields
  const mockData = [
    {
      _id: "674d1127e3869d361089288e",
      departmentName: "B.Tech",
      students: [
        { name: "John Doe", course: "B.Tech", year: "2nd", session: "2022-2026" },
        { name: "Jane Smith", course: "B.Tech", year: "3rd", session: "2021-2025" },
        { name: "Michael Johnson", course: "B.Tech", year: "1st", session: "2023-2027" },
        { name: "Emily Davis", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "David Brown", course: "B.Tech", year: "3rd", session: "2021-2025" },
        { name: "Sophia Miller", course: "B.Tech", year: "2nd", session: "2022-2026" },
        { name: "Daniel Wilson", course: "B.Tech", year: "1st", session: "2023-2027" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
        { name: "Olivia Taylor", course: "B.Tech", year: "4th", session: "2020-2024" },
      ],
    },
    {
      _id: "674d1293c4df6c286d1f28cf",
      departmentName: "Business Administration",
      students: [
        { name: "Chris Martin", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Liam Clark", course: "MBA", year: "2nd", session: "2022-2024" },
        { name: "Emma Scott", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Olivia Evans", course: "MBA", year: "2nd", session: "2022-2024" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },
        { name: "Noah Turner", course: "MBA", year: "1st", session: "2023-2025" },

      ],
    },
    {
      _id: "674d1180e3869d3610892892",
      departmentName: "Computer Science",
      students: [
        { name: "Akash Yadav", course: "MCA", year: "2nd", session: "2022-2024" },
        { name: "Sumit Sharma", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Ravi Kumar", course: "MCA", year: "2nd", session: "2022-2024" },
        { name: "Priya Mehta", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Amit Agarwal", course: "MCA", year: "2nd", session: "2022-2024" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },
        { name: "Anita Rani", course: "MCA", year: "1st", session: "2023-2025" },

        
      ],
    },
  ];

  useEffect(() => {
    // Set mock data initially
    setDepartments(mockData);
    // Initialize current page for each department
    const initialPageState = mockData.reduce((acc, dept) => {
      acc[dept._id] = 1; // Set initial page to 1 for each department
      return acc;
    }, {});
    setDepartmentPages(initialPageState);
  }, []);

  // Handle pagination logic for each department
  const paginateStudents = (students, deptId) => {
    const currentPage = departmentPages[deptId] || 1;
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    return students.slice(indexOfFirstStudent, indexOfLastStudent);
  };

  // Handle page change for a department
  const handlePageChange = (deptId, direction) => {
    setDepartmentPages((prevState) => {
      const currentPage = prevState[deptId] || 1;
      const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
      return { ...prevState, [deptId]: newPage };
    });
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          View Students Department Wise
        </h1>

        {departments.map((department) => (
          <div key={department._id} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {department.departmentName}
            </h2>

            {/* Department Table */}
            {department.students.length > 0 ? (
              <div
                className="overflow-x-auto mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md"
                style={{ maxHeight: "400px", overflowY: "auto" }} // Set fixed height
              >
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-md shadow-md">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                        Student Name
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                        Course
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                        Year
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">
                        Session
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginateStudents(department.students, department._id).map((student, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <td className="px-4 py-2">{student.name}</td>
                        <td className="px-4 py-2">{student.course}</td>
                        <td className="px-4 py-2">{student.year}</td>
                        <td className="px-4 py-2">{student.session}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <Button
                    onClick={() => handlePageChange(department._id, "prev")}
                    disabled={departmentPages[department._id] === 1}
                    className="px-4 py-2 text-sm"
                  >
                    Previous
                  </Button>
                  <span className="text-gray-700 dark:text-gray-300">
                    Page {departmentPages[department._id]} of{" "}
                    {Math.ceil(department.students.length / studentsPerPage)}
                  </span>
                  <Button
                    onClick={() => handlePageChange(department._id, "next")}
                    disabled={
                      department.students.length <= departmentPages[department._id] * studentsPerPage
                    }
                    className="px-4 py-2 text-sm"
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                No students found in this department.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
