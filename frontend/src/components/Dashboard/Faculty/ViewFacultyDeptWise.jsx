import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Ensure you're importing Button properly
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"; // Make sure to adjust these imports based on your table components

// Sample Data Response
const responseData = {
  data: [
    {
      _id: "674d1127e3869d361089288e",
      departmentName: "b.tech",
      faculties: [],
    },
    {
      _id: "674d1293c4df6c286d1f28cf",
      departmentName: "business administration",
      faculties: [],
    },
    {
      _id: "674d1180e3869d3610892892",
      departmentName: "computer science",
      faculties: [
        "Aparna Datta",
        "Soumya Chakraborty",
        "John Doe",
        "Jane Smith",
        "Harry Potter",
        "Hermione Granger",
        "Ron Weasley",
        "Albus Dumbledore",
        "Severus Snape",
        "Draco Malfoy",
      ],
    },
  ],
};

export default function ViewFacultyDeptWise() {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5; // Rows per page

  // Combine the department and faculty list for pagination
  const paginatedDepartments = responseData.data.map((dept) => ({
    ...dept,
    paginatedFaculties: dept.faculties.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    ),
  }));

  // Pagination empty rows (for consistent table height)
  const emptyRows = Array.from(
    { length: rowsPerPage - paginatedDepartments[0]?.paginatedFaculties.length },
    (_, index) => (
      <TableRow key={`empty-${index}`}>
        <TableCell colSpan={2}>&nbsp;</TableCell>
      </TableRow>
    )
  );

  // Handle pagination
  const handlePagination = (direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(responseData.data[0].faculties.length / rowsPerPage) - 1));
    } else if (direction === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 dark:bg-gray-900 pt-10">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-6 shadow-md rounded-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Faculty List by Department
        </h1>

        <Table className="border-separate border-spacing-0 border border-gray-300 dark:border-gray-700">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-700">
              <TableHead className="border-b border-gray-300 dark:border-gray-600 px-4 py-2">Department</TableHead>
              <TableHead className="border-b border-gray-300 dark:border-gray-600 px-4 py-2">Faculties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDepartments.map((dept) => (
              <TableRow key={dept._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <TableCell className="border-b border-gray-300 dark:border-gray-600 px-4 py-2">{dept.departmentName}</TableCell>
                <TableCell className="border-b border-gray-300 dark:border-gray-600 px-4 py-2">
                  <ul className="list-disc pl-4">
                    {dept.paginatedFaculties.length > 0 ? (
                      dept.paginatedFaculties.map((faculty, idx) => (
                        <li key={idx} className="text-sm">{faculty}</li>
                      ))
                    ) : (
                      <li className="text-sm">No faculties available</li>
                    )}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination("next")}
            disabled={currentPage >= Math.ceil(responseData.data[0]?.faculties.length / rowsPerPage) - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
